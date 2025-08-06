import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';   
import { ToastrService } from 'ngx-toastr'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  public currentUserSubject = new BehaviorSubject<any>(null);  
  constructor( private toastr: ToastrService,public router: Router) { }

  isUserLoggedIn() {  
        let token = localStorage.getItem('a-token');
        let isExpired = new JwtHelperService().isTokenExpired(token);
        if (!token && isExpired) {
          return false;
        } 
        this.currentUserSubject?.next(true);
        return true; 
    } 
  
  get currentUser() { 
      let token = localStorage.getItem('a-token');
      return new JwtHelperService().decodeToken(token ?? '');  
  }  
  
  logout() { 
    localStorage.removeItem('a-token'); 
    this.router.navigate(['/dashboard'])  
  }
  redirectToLogin() {
    this.router.navigate(['/login'])
  }
 
  

}


// -------------//cockies code
// getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

//  isUserLoggedIn() {  
//     let token = this.getCookie('newsLoginToken');
    
//     if (!token) {
//       return false; 
//     }

   
//     let isExpired = new JwtHelperService().isTokenExpired(token);
    
//     if (isExpired) {
//       return false;  
//     }
 

//   return true; 
// }

// get currentUser() { 
//     let token = this.getCookie('newsLoginToken');
    
//     if (token) { 
//       return new JwtHelperService().decodeToken(token);
//     }
//     return false
//   } 
// logout() { 
//     document.cookie = "newsLoginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
// }
//   redirectToLogin() {
//     this.router.navigate(['/login'])
//   }
// }

