import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { MachineMasterModel } from '../models/machine-master-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MachineMasterService {
  private headers = new HttpHeaders({ 'key': environment.adminApiKey });

  constructor(private http: HttpClient) { }
  // ADD -> POST /api/ItemMaster
  addMachine(data: MachineMasterModel): Observable<any> {
    return this.http.post(`${environment.identityUrl}MachineMaster/Add`, data, { headers: this.headers });
  }

  // UPDATE -> PUT /api/ItemMaster/UpdateItem
  updateMachine(data: MachineMasterModel): Observable<any> {
    return this.http.put(`${environment.identityUrl}MachineMaster/Update`, data, { headers: this.headers });
  }

  // GET ALL -> GET /api/ItemMaster
  getAllMachines(): Observable<MachineMasterModel[]> {
    return this.http.get<MachineMasterModel[]>(`${environment.identityUrl}MachineMaster/GetAll`, { headers: this.headers });
  }

  // GET BY ID -> GET /api/ItemMaster/{id}
  getMachineById(id: number): Observable<MachineMasterModel> {
    return this.http.get<MachineMasterModel>(`${environment.identityUrl}MachineMaster/GetBy/${id}`, { headers: this.headers });
  }

}
