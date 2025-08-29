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
        let token = localStorage.getItem('p-token');
        let isExpired = new JwtHelperService().isTokenExpired(token);
        if (!token && isExpired) {
          return false;
        } 
        this.currentUserSubject?.next(true);
        return true; 
    } 
  
  get currentUser() { 
      let token = localStorage.getItem('p-token');
      return new JwtHelperService().decodeToken(token ?? '');  
  }  
  
  logout() { 
    localStorage.removeItem('p-token'); 
    localStorage.removeItem('loggedInBranchAndFinancialYear'); 
    this.router.navigate(['/dashboard/dashboard'])  
  }
  redirectToLogin() {
    this.router.navigate(['/login'])
  }
 setBranchAndFinancialYear(details: any) {
    localStorage.setItem('loggedInBranchAndFinancialYear', JSON.stringify(details));
  }
  getBranchAndFinancialYear() {
    const details = localStorage.getItem('loggedInBranchAndFinancialYear');
    return details ? JSON.parse(details) : null;
  }
  clearBranchAndFinancialYear() {
    localStorage.removeItem('loggedInBranchAndFinancialYear');
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
//     let token = this.getCookie('newLoginToken');
    
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
//     let token = this.getCookie('newLoginToken');
    
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

