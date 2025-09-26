import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { RoleMasterModel } from '../models/role-master-model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleMasterService {
  private headers = new HttpHeaders({ 'key': environment.adminApiKey });

  constructor(private http: HttpClient) { }

  addRole(data: RoleMasterModel): Observable<any> {
    return this.http.post(`${environment.identityUrl}RoleMaster/Add`, data, { headers: this.headers });
  }

  updateRole(data: RoleMasterModel): Observable<any> {
    return this.http.put(`${environment.identityUrl}RoleMaster/Update`, data, { headers: this.headers });
  }

  getAllRoles(): Observable<RoleMasterModel[]> {
    return this.http.get<RoleMasterModel[]>(`${environment.identityUrl}RoleMaster/GetAll`, { headers: this.headers });
  }

  getRoleById(id: number): Observable<RoleMasterModel> {
    return this.http.get<RoleMasterModel>(`${environment.identityUrl}RoleMaster/GetBy${id}`, { headers: this.headers });
  }

}
