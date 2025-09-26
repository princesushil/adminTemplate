import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { RolewisemenuMasterModel } from '../models/rolewisemenu-master-model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolewisemenuMasterService {
  
  private headers = new HttpHeaders({ 'key': environment.adminApiKey });

  constructor(private http: HttpClient) { }

  addRolewiseMenu(data: RolewisemenuMasterModel): Observable<any> {
    return this.http.post(`${environment.identityUrl}RolewiseMenuMaster/Add`, data, { headers: this.headers });
  }

  updateRolewiseMenu(data: RolewisemenuMasterModel): Observable<any> {
    return this.http.put(`${environment.identityUrl}RolewiseMenuMaster/Update`, data, { headers: this.headers });
  }

  getAllRolewiseMenus(): Observable<RolewisemenuMasterModel[]> {
    return this.http.get<RolewisemenuMasterModel[]>(`${environment.identityUrl}RolewiseMenuMaster/getAll`, { headers: this.headers });
  }

  getRolewiseMenuById(id: number): Observable<RolewisemenuMasterModel> {
    return this.http.get<RolewisemenuMasterModel>(`${environment.identityUrl}RolewiseMenuMaster/${id}`, { headers: this.headers });
  }

}
