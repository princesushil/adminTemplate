import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { ItemMasterModel } from '../models/item-master-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {
  private headers = new HttpHeaders({ 'key': environment.adminApiKey });

  constructor(private http: HttpClient) { }

  // ADD -> POST /api/ItemMaster
  addItem(data: ItemMasterModel): Observable<any> {
    return this.http.post(`${environment.identityUrl}ItemMaster/Add`, data, { headers: this.headers });
  }

  // UPDATE -> PUT /api/ItemMaster/UpdateItem
  updateItem(data: ItemMasterModel): Observable<any> {
    return this.http.put(`${environment.identityUrl}ItemMaster/Update`, data, { headers: this.headers });
  }

  // GET ALL -> GET /api/ItemMaster
  getAllItems(): Observable<ItemMasterModel[]> {
    return this.http.get<ItemMasterModel[]>(`${environment.identityUrl}ItemMaster/GetAll`, { headers: this.headers });
  }

  // GET BY ID -> GET /api/ItemMaster/{id}
  getItemById(id: number): Observable<ItemMasterModel> {
    return this.http.get<ItemMasterModel>(`${environment.identityUrl}ItemMaster/GetBy${id}`, { headers: this.headers });
  }
}
