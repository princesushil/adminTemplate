
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../cores/services/authService';
import { RegistrationService } from '../../../../services/registration-service';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  submitted = false;
  private ngUnsubscribe = new Subject<void>();
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
    private spinner: NgxSpinnerService,
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
            this.auth.currentUserSubject?.next(true);
            localStorage.setItem('loggedInAtMoment', moment(moment()).format("HH:mm:ss"));
          }
        }
      },
      (error: any) => {
        this.toastr.error('Invalid username or password!', 'Failed');
        this.spinner.hide()
      }
    );
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
