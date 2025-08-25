 
import { ColumnMode } from '@swimlane/ngx-datatable';

export class GridViewConfig {
    requestUrl: string="";
    gridViewData: any[] = [];
    columnConfig: Array<ColumnsConfig> = new Array<ColumnsConfig>(); 
    columnMode = ColumnMode;
    totalRecordCount: number=0;
    rowsPerPage: number = 5;
    mode:any;
    fromDate:string="";
    toDate:string=""
    pageNumber: number = 1;
    searchText: string = "";
    sortDirection: string = "";
    sortProperty: string = "";
    documentType: string = ""; 
    loginBranchId: number=0;
    requestType: string="";
    financialYear: string="";
    createdBy: string="";
    isAdminRole: boolean=false; 
    searchProperties: { [key: string]: any } = {};
}

export interface ColumnsConfig {
    fieldName: string;
    fieldProperty: string;
    columnWidth: number;
    rowsPerPage: number;
}

export class GridViewResult {
    rowData: any;
} 