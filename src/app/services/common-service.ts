import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
    constructor(private http: HttpClient,) { }

   getOperationColumnConfigByType(requestType: string) {
    return this.http.get(`${environment.baseUrl}referenceData/getColumnConfigByType?requestType=${requestType}`);
  }
   exportToExcel(response: Blob, fileName: string) {
    const link = document.createElement('a');
    const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
    link.setAttribute('href', window.URL.createObjectURL(blob));
    link.setAttribute('download', `${fileName}.xlsx`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  getRoleWiseMenu()
  {
     return this.http.get(`${environment.identityUrl}Menu/GetMenuByLoginUserRoleId`);
  }
}
