import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { UserroleassignMasterModel } from '../models/userroleassign-master-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserroleassignMasterService {

  private headers = new HttpHeaders({ 'key': environment.adminApiKey });

  constructor(private http: HttpClient) { }

  addUserRoleAssign(data: UserroleassignMasterModel): Observable<any> {
    return this.http.post(`${environment.identityUrl}UserRoleAssignMaster/Add`, data, { headers: this.headers });
  }

  updateUserRoleAssign(data: UserroleassignMasterModel): Observable<any> {
    return this.http.put(`${environment.identityUrl}UserRoleAssignMaster/Update`, data, { headers: this.headers });
  }

  getAllUserRoleAssigns(): Observable<UserroleassignMasterModel[]> {
    return this.http.get<UserroleassignMasterModel[]>(`${environment.identityUrl}UserRoleAssignMaster/getAll`, { headers: this.headers });
  }

  getUserRoleAssignById(id: number): Observable<UserroleassignMasterModel> {
    return this.http.get<UserroleassignMasterModel>(`${environment.identityUrl}UserRoleAssignMaster/${id}`, { headers: this.headers });
  }


}
