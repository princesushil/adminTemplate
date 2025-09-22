export class CustomerMasterModel {
    cust_Id: number = 0;  
    cust_Name: string = '';
    cust_Email?: string;
    cust_PhoneNo?: string;
    cust_Address?: string;
    gstNo?: string;
    createdBy?: string;
    createdOn?: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
    isActive: boolean = true;
    // mode?: string;
}
