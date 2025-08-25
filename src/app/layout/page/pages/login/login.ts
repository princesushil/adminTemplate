
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../cores/services/authService';
import { RegistrationService } from '../../../../services/registration-service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  email: string | null = '';
  otp: string | null = '';
  user: any;
  loginData: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private registrationService: RegistrationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['sushil.suryawanshi@acplcargo.com', [Validators.required, Validators.email]],
      password: ['12345678', Validators.required]
    });

    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(['/home']);
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
            const id = this.auth.currentUser?.id
            this.router.navigate(['/dashboard/dashboard']);
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
}
