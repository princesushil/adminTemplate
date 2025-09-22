export class ItemMasterModel {
  id: number = 0;
  itemCode: string = '';
  itemName: string = '';
  categoryId: number = 0;
  subCategoryId?: number;
  openingStock: number = null;
  openingStockAsOn?: Date;
  itemStock: number = null;
  perUnitPrice: number = null;
  createdBy: string = '';
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  isActive: boolean = true;
  ledgerId?: number;
  hsnNo:string='';
}

