import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { GridViewConfig } from '../models/GridViewConfig.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GridViewService {

  constructor(private _httpClient: HttpClient) { }

  getGridData(gridViewConfig: GridViewConfig) {
    if (gridViewConfig.pageNumber > 0) {
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._httpClient.post(`${gridViewConfig.requestUrl}`,
        {
          pageNumber: gridViewConfig.pageNumber,
          rowsPerPage: gridViewConfig.rowsPerPage,
          searchText: gridViewConfig.searchText,
          sortDirection: gridViewConfig.sortDirection,
          sortProperty: gridViewConfig.sortProperty,
          mode: gridViewConfig.mode,
          fromDate: gridViewConfig.fromDate,
          toDate: gridViewConfig.toDate,
          loginBranchId: gridViewConfig.loginBranchId,
          financialYear: gridViewConfig.financialYear,
          createdBy: gridViewConfig.createdBy,
          isAdminRole: gridViewConfig.isAdminRole,
          requestType: gridViewConfig.requestType, 
          searchProperties:gridViewConfig.searchProperties,
        }, { headers: headers, observe: 'response' })
    }
    return null
  } 

  generateExcel(reportModel: any, requestType: string) {
    let url: string = requestType == 'Transaction' ? environment.transactionsBaseUrl : requestType == 'Master' ? environment.baseUrl : ''
    return this._httpClient.post(`${url}reports/exportRecordsToExcel`, reportModel, { responseType: 'blob' });
  }
}
