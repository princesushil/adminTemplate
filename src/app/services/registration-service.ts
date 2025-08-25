import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private _httpClient: HttpClient) { }
  login(userData: any): Observable<any> {
    return this._httpClient.post<any>(`${environment.identityUrl}Auth/login`, userData);
  }
  register(userData: any): Observable<any> {
    return this._httpClient.post<any>(`${environment.identityUrl}UserRegistration/register`, userData);
  }
}
