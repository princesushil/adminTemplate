import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemMasterService } from '../services/item-master';
import { ItemMasterModel } from '../models/item-master-model';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../../services/validators.service.ts';
import { AuthService } from '../../../cores/services/authService';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.html',
  styleUrls: ['./item-master.scss'],
  standalone: false,
})
export class ItemMasterComponent implements OnInit {
  itemForm!: FormGroup;
  items: ItemMasterModel[] = [];
  itemMasterModel: ItemMasterModel = new ItemMasterModel();
  isEditMode: boolean = false;
  showList: boolean = false;
  isSubmitted = false;

  // dropdowns
  categories = [
    // 'Electronics', 'Furniture', 'Stationery'
    { label: 'Electronics', categoryId: 'Electronics' },
    { label: 'Furniture', categoryId: 'Furniture' },
    { label: 'Stationery', categoryId: 'Stationery' },
  ];
  ledgers = [
    // 'Ledger A', 'Ledger B', 'Ledger C'
    { label: 'Ledger A', ledgerId: 1 },
    { label: 'Ledger B', ledgerId: 2 },
    { label: 'Ledger C', ledgerId: 3},
  ];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemMasterService,
    private toastr: ToastrService,
    private _validationService: ValidatorsService,
    private _authService: AuthService


  ) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      id: [0],
      itemCode: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      itemName: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      category: [null, Validators.required],
      openingStock: [, [Validators.required, Validators.min(0)]],
      openingStockAsOn: [new Date().toISOString().substring(0, 10), Validators.required],
      itemStock: [, [Validators.required, Validators.min(0)]],
      perUnitPrice: [, [Validators.required, Validators.min(0)]],
      isActive: [true],
      ledgerId: [null, Validators.required],
      hsnNo: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
    });
  }

  // showItems(){
  //   this.loadItems();
  // }
  // Toggle Show/Hide List
  toggleList() {
    this.showList = !this.showList;  // simple toggle
    if (this.showList) {
      this.loadItems(); // load only when showing   
    }
  }

  loadItems() {
    this.itemService.getAllItems().subscribe({
      next: (data) => (this.items = data),
      error: (err) => console.error('Error loading items:', err),
    });
  }

  // Add / Update
  onSubmit() {
    this.isSubmitted = true;
    if (this.itemForm.valid) {
      // map form -> model
      // this.itemMasterModel = { ...this.itemForm.value } as ItemMasterModel;
      // fix type conversions
      // this.itemMasterModel.categoryId = this.getCategoryId(this.itemForm.value.category);
      // this.itemMasterModel.ledgerId = this.getLedgerId(this.itemForm.value.ledgerId);
      // this.itemMasterModel.openingStockAsOn = new Date(this.itemForm.value.openingStockAsOn);
      // this.itemMasterModel.createdBy = 'Admin';
      this.itemMasterModel = new ItemMasterModel();

      // manual mapping (form → model)
      this.itemMasterModel.id = this.itemForm.value.id || 0;
      this.itemMasterModel.itemCode = this.itemForm.value.itemCode;
      this.itemMasterModel.itemName = this.itemForm.value.itemName;
      this.itemMasterModel.categoryId = this.getCategoryId(this.itemForm.value.category);
      this.itemMasterModel.subCategoryId = this.itemForm.value.subCategoryId || 0;
      this.itemMasterModel.openingStock = this.itemForm.value.openingStock;
      this.itemMasterModel.openingStockAsOn = new Date(this.itemForm.value.openingStockAsOn);
      this.itemMasterModel.itemStock = this.itemForm.value.itemStock;
      this.itemMasterModel.perUnitPrice = this.itemForm.value.perUnitPrice;
      this.itemMasterModel.isActive = this.itemForm.value.isActive;
      this.itemMasterModel.ledgerId = this.getLedgerId(this.itemForm.value.ledgerId);
      this.itemMasterModel.createdBy = this._authService.currentUser.Id
      this.itemMasterModel.hsnNo = this.itemForm.value.hsnNo;

      if (this.isEditMode) {
        // UPDATE
        this.itemService.updateItem(this.itemMasterModel).subscribe({
          next: () => {
            this.toastr.success('Item updated successfully!', 'Success');
            this.resetForm();
            this.loadItems();
          },
          error: (err) => {
            console.error('Error updating item:', err);
            this.toastr.error('Failed to update item.', 'Error');
          },
        });
      } else {
        // ADD
        this.itemService.addItem(this.itemMasterModel).subscribe({
          next: () => {
            this.toastr.success('Item added successfully!', 'Success');
            this.resetForm();
            this.loadItems();
          },
          error: (err) => {
            console.error('Error saving item:', err);
            this.toastr.error('Failed to save item.', 'Error');
          },
        });
      }
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  // Reset form
  resetForm() {
    this.itemForm.reset({
      id: 0,
      itemCode: '',
      itemName: '',
      category: '',
      openingStock: 0,
      openingStockAsOn: new Date().toISOString().substring(0, 10),
      itemStock: 0,
      perUnitPrice: 0,
      isActive: true,
      ledgerId: '',
      hsnNo: '',
    });
    this.isEditMode = false;
  }

  // Edit
  onEdit(item: ItemMasterModel) {
    this.itemForm.patchValue({
      // ...item,
      // category: this.getCategoryName(item.categoryId),
      // ledgerId: this.getLedgerName(item.ledgerId),
      // openingStockAsOn: item.openingStockAsOn
      //   ? new Date(item.openingStockAsOn).toISOString().substring(0, 10)
      //   : new Date().toISOString().substring(0, 10),
      id: item.id,
      itemCode: item.itemCode,
      itemName: item.itemName,
      category: this.getCategoryName(item.categoryId),
      subCategoryId: item.subCategoryId || 0,
      openingStock: item.openingStock,
      openingStockAsOn: item.openingStockAsOn
        ? new Date(item.openingStockAsOn).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      itemStock: item.itemStock,
      perUnitPrice: item.perUnitPrice,
      isActive: item.isActive,
      ledgerId: item.ledgerId,//this.getLedgerName(item.ledgerId),
      hsnNo: item.hsnNo,
    });
    this.isEditMode = true;
  }

  // Helpers for category & ledger (map string <-> id)
  getCategoryId(name: string): number {
    const map: any = { Electronics: 1, Furniture: 2, Stationery: 3 };
    return map[name] || 0;
  }

  getCategoryName(id?: number): string {
    const map: any = { 1: 'Electronics', 2: 'Furniture', 3: 'Stationery' };
    return map[id || 0] || '';
  }

  getLedgerId(name: string): number {
    const map: any = { 'Ledger A': 1, 'Ledger B': 2, 'Ledger C': 3 };
    return map[name] || 0;
  }

  getLedgerName(id?: number): string {
    const map: any = { 1: 'Ledger A', 2: 'Ledger B', 3: 'Ledger C' };
    return map[id || 0] || '';
  }
}
