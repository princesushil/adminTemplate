export class RolewisemenuMasterModel {
    id: number = 0;
    roleId: number = 0;
    menuId: number = 0;
    isActive: boolean = true;
    isObsolete: boolean = false;
    createdBy?: string;
    createdOn?: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
}
