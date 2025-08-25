import { Component } from '@angular/core';
import { AuthService } from '../../../../cores/services/authService';

@Component({
  selector: 'app-unautherized-access', 
  standalone:false,
  templateUrl: './unautherized-access.html',
  styleUrl: './unautherized-access.scss'
})
export class UnautherizedAccess {
  constructor(public authService:AuthService){}

}
