// spinner.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private requestCount = 0;
  private _isLoading = new BehaviorSubject<boolean>(false);

  isLoading$ = this._isLoading.asObservable();

  show() {
    this.requestCount++;
    this._isLoading.next(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this._isLoading.next(false);
    }
  }
}
