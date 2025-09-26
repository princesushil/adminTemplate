import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolewisemenuMasterModel } from '../models/rolewisemenu-master-model';
import { RolewisemenuMasterService } from '../services/rolewisemenu-master-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../cores/services/authService';

@Component({
  selector: 'app-rolewisemenu-master',
  templateUrl: './rolewisemenu-master.html',
  styleUrl: './rolewisemenu-master.scss',
  standalone: false,
})
export class RolewisemenuMaster implements OnInit {
  rolewiseMenuForm!: FormGroup;
  rolewiseMenus: RolewisemenuMasterModel[] = [];
  rolewiseMenuModel: RolewisemenuMasterModel = new RolewisemenuMasterModel();
  isEditMode: boolean = false;
  showList: boolean = false;
  isSubmitted = false;

// Inside your component class
roles = [
  { value: 1, label: 'Admin' },
  { value: 2, label: 'Manager' },
  { value: 3, label: 'User' }
];

menus = [
  { value: 101, label: 'Dashboard' },
  { value: 102, label: 'Reports' },
  { value: 103, label: 'Settings' },
  { value: 104, label: 'Users' },
  { value: 105, label: 'Billing' },
  { value: 106, label: 'Support' },
  { value: 107, label: 'Notifications' }
];

  constructor(
    private fb: FormBuilder,
    private rolewiseMenuService: RolewisemenuMasterService,
    private toastr: ToastrService,
    private _authService :AuthService
  ) { }

  ngOnInit(): void {
    this.rolewiseMenuForm = this.fb.group({
      id: [0],
      roleId: [null, Validators.required],
      menuId: [[], Validators.required],
      isActive: [true],
    });
  }

  toggleList() {
    this.showList = !this.showList;
    if (this.showList) {
      this.loadRolewiseMenus();
    }
  }

  loadRolewiseMenus() {
    this.rolewiseMenuService.getAllRolewiseMenus().subscribe({
      next: (data) => (this.rolewiseMenus = data),
      error: (err) => console.error('Error loading RolewiseMenus:', err),
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.rolewiseMenuForm.valid) {
      this.rolewiseMenuModel = new RolewisemenuMasterModel();

      this.rolewiseMenuModel.id = this.rolewiseMenuForm.value.id || 0;
      this.rolewiseMenuModel.roleId = this.rolewiseMenuForm.value.roleId;
      this.rolewiseMenuModel.menuId = this.rolewiseMenuForm.value.menuId;
      this.rolewiseMenuModel.isActive = this.rolewiseMenuForm.value.isActive;
      this.rolewiseMenuModel.createdBy = this._authService.currentUser.Id;

      if (this.isEditMode) {
        this.rolewiseMenuService.updateRolewiseMenu(this.rolewiseMenuModel).subscribe({
          next: () => {
            this.toastr.success('Rolewise Menu updated successfully!', 'Success');
            this.resetForm();
            this.loadRolewiseMenus();
          },
          error: (err) => {
            console.error('Error updating Rolewise Menu:', err);
            this.toastr.error('Failed to update Rolewise Menu.', 'Error');
          },
        });
      } else {
        this.rolewiseMenuService.addRolewiseMenu(this.rolewiseMenuModel).subscribe({
          next: () => {
            this.toastr.success('Rolewise Menu added successfully!', 'Success');
            this.resetForm();
            this.loadRolewiseMenus();
          },
          error: (err) => {
            console.error('Error saving Rolewise Menu:', err);
            this.toastr.error('Failed to save Rolewise Menu.', 'Error');
          },
        });
      }
    } else {
      this.rolewiseMenuForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.rolewiseMenuForm.reset({
      id: 0,
      roleId: 0,
      menuId: 0,
      isActive: true,
    });
    this.isEditMode = false;
    this.isSubmitted = false;
  }

  onEdit(rolewiseMenu: RolewisemenuMasterModel) {
    this.rolewiseMenuForm.patchValue({
      id: rolewiseMenu.id,
      roleId: rolewiseMenu.roleId,
      menuId: rolewiseMenu.menuId,
      isActive: rolewiseMenu.isActive,
    });
    this.isEditMode = true;
  }
}