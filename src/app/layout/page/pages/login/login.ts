
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../cores/services/authService';
import { RegistrationService } from '../../../../services/registration-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../services/common-service';
import { AppStateService } from '../../../../cores/services/app-state-service';
import { MenuService } from '../../../../cores/services/menu-service';
import moment from 'moment';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  ngUnsubscribe = new Subject();
  email: string = '';
  otp: string = '';
  user: any;
  loginData: any;
  menuList: any;
  isMenuLoaded: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private registrationService: RegistrationService,
    private _commonService: CommonService,
    private spinner: NgxSpinnerService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['sushil.suryawanshi@acplcargo.com', [Validators.required, Validators.email]],
      password: ['12345678', Validators.required]
    });

    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(['/dashboard/dashboard']);
    }

  }

  reset() {
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.spinner.show()
    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.spinner.hide();
      return;
    }

    this.loginData = this.loginForm.value;
    this.registrationService.login(this.loginData).subscribe(
      (response: any) => {
        if (response) {
          this.spinner.hide()
          this.submitted = false;
          if (response.token) {
            localStorage.setItem('p-token', response.token);
              this.router.navigate(['/dashboard/dashboard']);
            this.loadMenuIfNeeded()
            this.auth.currentUserSubject?.next(true);
          }
        }
      },
      (error: any) => {
        this.toastr.error('Invalid username or password!', 'Failed');
        this.spinner.hide()
      }
    );
  }
  private loadMenuIfNeeded(): void {
    if (!this.menuList && !this.isMenuLoaded) {
      this.isMenuLoaded = true; // ✅ prevent multiple calls
      this._commonService
        .getRoleWiseMenu()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response: any) => {
          if (response) {
            this.menuService.setMenuItems(response); 
            localStorage.setItem('loggedInAtMoment', moment(moment()).format("HH:mm:ss"));
            //this.router.navigate(['/dashboard/dashboard']);
          }
        });
    }
    else{
       this.router.navigate(['/dashboard/dashboard']);
    }
  }

}
