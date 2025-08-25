import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchMasterService {
     adminHeaders = new HttpHeaders({'key' : environment.adminApiKey });
    constructor(private http: HttpClient) { }
    getBranchById(id: number) {
     return this.http.get<Array<any>>(`${environment.baseUrl}vendor/getVendorById?vendorId=${id}`, { headers: this.adminHeaders });
  }
}
