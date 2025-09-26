export class UserroleassignMasterModel {
    id: number = 0;
    userId: number = 0;
    roleId: number = 0;
    isActive: boolean = true;
    isObsolete: boolean = false;
    createdBy?: string;
    createdOn?: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
}
