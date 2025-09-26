import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleMasterModel } from '../models/role-master-model';
import { RoleMasterService } from '../services/role-master-service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../../services/validators.service.ts';
import { AuthService } from '../../../cores/services/authService';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.html',
  styleUrl: './role-master.scss',
  standalone: false,
})
export class RoleMaster implements OnInit {
  roleForm!: FormGroup;
  roles: RoleMasterModel[] = [];
  roleModel: RoleMasterModel = new RoleMasterModel();
  isEditMode: boolean = false;
  showList: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleMasterService,
    private toastr: ToastrService,
    private _validationService: ValidatorsService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      id: [0],
      role: ['', [Validators.required,Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      description: ['', [Validators.maxLength(200)]],
      isActive: [true],
    });
  }

  toggleList() {
    this.showList = !this.showList;
    if (this.showList) {
      this.loadRoles();
    }
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('Error loading roles:', err),
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      this.roleModel = new RoleMasterModel();

      // form → model mapping
      this.roleModel.id = this.roleForm.value.id || 0;
      this.roleModel.role = this.roleForm.value.role;
      this.roleModel.description = this.roleForm.value.description;
      this.roleModel.isActive = this.roleForm.value.isActive;
      this.roleModel.createdBy = this._authService.currentUser.Id;

      if (this.isEditMode) {
        // UPDATE
        this.roleService.updateRole(this.roleModel).subscribe({
          next: () => {
            this.toastr.success('Role updated successfully!', 'Success');
            this.resetForm();
            this.loadRoles();
          },
          error: (err) => {
            console.error('Error updating role:', err);
            this.toastr.error('Failed to update role.', 'Error');
          },
        });
      } else {
        // ADD
        this.roleService.addRole(this.roleModel).subscribe({
          next: () => {
            this.toastr.success('Role added successfully!', 'Success');
            this.resetForm();
            this.loadRoles();
          },
          error: (err) => {
            console.error('Error saving role:', err);
            this.toastr.error('Failed to save role.', 'Error');
          },
        });
      }
    } else {
      this.roleForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.roleForm.reset({
      id: 0,
      role: '',
      description: '',
      isActive: true,
    });
    this.isEditMode = false;
  }

  onEdit(role: RoleMasterModel) {
    this.roleForm.patchValue({
      id: role.id,
      role: role.role,
      description: role.description || '',
      isActive: role.isActive,
    });
    this.isEditMode = true;
  }
}

