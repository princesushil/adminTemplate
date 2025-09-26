export class RoleMasterModel {
    id: number = 0;
    role: string = '';
    description?: string;
    isActive: boolean = true;
    createdBy?: string;
    createdOn?: Date
    modifiedBy?: string;
    modifiedOn?: Date;
}
