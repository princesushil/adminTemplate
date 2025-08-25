import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setToken(token:any): void {
    localStorage.setItem('p-token', token);
  }

  getToken(): any {
    return localStorage.getItem('p-token');
  }

getFinancialYear(): string {
  const stored = localStorage.getItem('branchAndFinancialYear');
  const parsed = stored ? JSON.parse(stored) : null;
  const financialYear = parsed?.year ?? "";
  return financialYear;
}
isUserLoggedIn(): boolean {
  const token = this.getToken();
  return token !== null && token.trim() !== '';
}

getLoggedInBranch(): string | null {
  const stored = localStorage.getItem('branchAndFinancialYear');
  const parsed = stored ? JSON.parse(stored) : null;
  return parsed?.branch ?? null;
}

}
