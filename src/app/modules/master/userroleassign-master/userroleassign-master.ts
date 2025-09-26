import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserroleassignMasterModel } from '../models/userroleassign-master-model';
import { UserroleassignMasterService } from '../services/userroleassign-master-service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../../services/validators.service.ts';
import { AuthService } from '../../../cores/services/authService';

@Component({
  selector: 'app-userroleassign-master',
  templateUrl: './userroleassign-master.html',
  styleUrl: './userroleassign-master.scss',
  standalone: false
})
export class UserroleassignMaster implements OnInit {
  userRoleAssignForm!: FormGroup;
  userRoleAssigns: UserroleassignMasterModel[] = [];
  userRoleAssignModel: UserroleassignMasterModel = new UserroleassignMasterModel();
  isEditMode = false;
  showList = false;
  isSubmitted = false;

  // Hardcoded users and roles (later you can load from API)
  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Michael Scott' }
  ];

  roles = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Manager' },
    { value: 3, label: 'User' }
  ];

  constructor(
    private fb: FormBuilder,
    private userRoleAssignService: UserroleassignMasterService,
    private toastr: ToastrService,
    private _validationService: ValidatorsService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRoleAssignForm = this.fb.group({
      userRoleAssignId: [0],
      userId: [null, Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)],
      roleId: [null, Validators.required],
      isActive: [true],
    });
  }

  toggleList() {
    this.showList = !this.showList;
    if (this.showList) {
      this.loadUserRoleAssigns();
    }
  }

  loadUserRoleAssigns() {
    this.userRoleAssignService.getAllUserRoleAssigns().subscribe({
      next: (data) => (this.userRoleAssigns = data),
      error: (err) => console.error('Error loading UserRoleAssigns:', err),
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userRoleAssignForm.valid) {
      this.userRoleAssignModel = { ...this.userRoleAssignForm.value };
      this.userRoleAssignModel.createdBy = this._authService.currentUser.Id;
      
      if (this.isEditMode) {
        this.userRoleAssignService.updateUserRoleAssign(this.userRoleAssignModel).subscribe({
          next: () => {
            this.toastr.success('User Role Assign updated successfully!', 'Success');
            this.resetForm();
            this.loadUserRoleAssigns();
          },
          error: (err) => {
            console.error('Error updating User Role Assign:', err);
            this.toastr.error('Failed to update User Role Assign.', 'Error');
          },
        });
      } else {
        this.userRoleAssignService.addUserRoleAssign(this.userRoleAssignModel).subscribe({
          next: () => {
            this.toastr.success('User Role Assign added successfully!', 'Success');
            this.resetForm();
            this.loadUserRoleAssigns();
          },
          error: (err) => {
            console.error('Error saving User Role Assign:', err);
            this.toastr.error('Failed to save User Role Assign.', 'Error');
          },
        });
      }
    } else {
      this.userRoleAssignForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.userRoleAssignForm.reset({
      id: 0,
      userId: null,
      roleId: null,
      isActive: true,
    });
    this.isEditMode = false;
    this.isSubmitted = false;
  }

  onEdit(item: UserroleassignMasterModel) {
    this.userRoleAssignForm.patchValue({
      id: item.id,
      userId: item.userId,
      roleId: item.roleId,
      isActive: item.isActive,
    });
    this.isEditMode = true;
  }
}
