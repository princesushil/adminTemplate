import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { CustomerMasterModel } from '../models/customer-master-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerMasterService {
  private headers = new HttpHeaders({ 'key': environment.adminApiKey });

  constructor(private http: HttpClient) { }

  addCustomer(data: CustomerMasterModel): Observable<any> {
    return this.http.post(`${environment.identityUrl}CustomerMaster/Add`, data, { headers: this.headers });
  }

  updateCustomer(data: CustomerMasterModel): Observable<any> {
    return this.http.put(`${environment.identityUrl}CustomerMaster/Update`, data, { headers: this.headers });
  }

  getAllCustomers(): Observable<CustomerMasterModel[]> {
    return this.http.get<CustomerMasterModel[]>(`${environment.identityUrl}CustomerMaster/getAll`, { headers: this.headers });
  }

  getCustomerById(id: number): Observable<CustomerMasterModel> {
    return this.http.get<CustomerMasterModel>(`${environment.identityUrl}CustomerMaster/${id}`, { headers: this.headers });
  }

}
