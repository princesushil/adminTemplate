import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerMasterModel } from '../models/customer-master-model';
import { CustomerMasterService } from '../services/customer-master-service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../../services/validators.service.ts';
import { AuthService } from '../../../cores/services/authService';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.html',
  styleUrl: './customer-master.scss',
  standalone: false,

})
export class CustomerMaster implements OnInit {
  customerForm!: FormGroup;
  customers: CustomerMasterModel[] = [];
  customerModel: CustomerMasterModel = new CustomerMasterModel();
  isEditMode: boolean = false;
  showList: boolean = false;
  isSubmitted = false


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerMasterService,
    private toastr: ToastrService,
    private _validationService: ValidatorsService,
    private _authService :AuthService

  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      cust_Id: [0],
      cust_Name: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      cust_Email: ['', [Validators.required, Validators.pattern(this._validationService.emailPattern)]],
      cust_PhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      cust_Address: ['', [Validators.required, Validators.pattern(this._validationService.addressPattern)]],
      gstNo: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      isActive: [true],
    });
  }

  toggleList() {
    this.showList = !this.showList;
    if (this.showList) {
      this.loadCustomers();
    }
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error loading customers:', err),
    });
  }

  onSubmit() {
    debugger
    this.isSubmitted = true;
    if (this.customerForm.valid) {
      this.customerModel = new CustomerMasterModel();

      // manual mapping (form → model)
      this.customerModel.cust_Id = this.customerForm.value.cust_Id || 0;
      this.customerModel.cust_Name = this.customerForm.value.cust_Name;
      this.customerModel.cust_Email = this.customerForm.value.cust_Email;
      this.customerModel.cust_PhoneNo = this.customerForm.value.cust_PhoneNo;
      this.customerModel.cust_Address = this.customerForm.value.cust_Address;
      this.customerModel.gstNo = this.customerForm.value.gstNo;
      this.customerModel.isActive = this.customerForm.value.isActive;
      this.customerModel.createdBy = this._authService.currentUser.Id;
      console.log( this._authService.currentUser);
      if (this.isEditMode) {
        // UPDATE
        this.customerService.updateCustomer(this.customerModel).subscribe({
          next: () => {
            // alert('Customer updated successfully!');
            this.toastr.success('Customer updated successfully!', 'Success');
            this.resetForm();
            this.loadCustomers();
          },
          error: (err) => {
            console.error('Error updating customer:', err);
            // alert('Failed to update customer.');
            this.toastr.error('Failed to update customer.', 'Error');

          },
        });
      } else {
        // ADD
        this.customerService.addCustomer(this.customerModel).subscribe({
          next: () => {
            this.toastr.success('Customer added successfully!', 'Success');
            this.resetForm();
            this.loadCustomers();
          },
          error: (err) => {
            console.error('Error saving customer:', err);
            // alert('Failed to save customer.');
            this.toastr.error('Failed to save customer.', 'Error');

          },
        });
      }
    } else {
      this.customerForm.markAllAsTouched();
    }
  }


  resetForm() {
    this.customerForm.reset({
      cust_Id: 0,
      cust_Name: '',
      cust_Email: '',
      cust_PhoneNo: '',
      cust_Address: '',
      gstNo: '',
      isActive: true,
    });
    this.isEditMode = false;
  }

  // Edit
  onEdit(customer: CustomerMasterModel) {
    this.customerForm.patchValue({
      cust_Id: customer.cust_Id,
      cust_Name: customer.cust_Name,
      cust_Email: customer.cust_Email || '',
      cust_PhoneNo: customer.cust_PhoneNo || '',
      cust_Address: customer.cust_Address || '',
      gstNo: customer.gstNo || '',
      isActive: customer.isActive,
    });

    this.isEditMode = true;
  }

}
