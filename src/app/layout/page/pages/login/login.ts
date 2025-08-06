import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Subject, takeUntil } from 'rxjs'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../cores/services/authService';
import { RegistrationService } from '../../../../services/registration-service';

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
  spinner: boolean = false;
  user: any;
  loginData: any;

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private registrationService:RegistrationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['testuser@acplcargo.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });

    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(['/home']);
    }

    this.route.queryParams.subscribe(params => {
      this.email = params['q'];
      this.otp = params['otp'];
    

    //   if (this.email) {
    //     this.registrationService.verifyEmailOtp(this.email, this.otp, true).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
    //       next: (response: any) => {
    //          this.toastr.success(response.value?.message, 'Success'); 
    //         this.router.navigate(['/dashboard']);
    //         this.spinner = false;
    //       },
    //       error: (err:any) => {
    //              this.toastr.success('error verifying email:', 'Success');  
    //         this.spinner = false; 
    //       }
    //     });
    //   }
     });
  } 

  reset() {
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.spinner = true;
    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.spinner = false;
      return;
    }

    this.loginData = this.loginForm.value;
    this.loginData.isExternalUser = true;
   this.toastr.success('Logged In successfully!', 'Success');
    this.router.navigate(['/dashboard']);
    this.registrationService.login(this.loginData).subscribe(
      (response: any) => {
        if (response) {
          this.spinner = false;
          this.submitted = false;
          if (response.token) {
            localStorage.setItem('newsLoginToken', response.token);
          }
          this.toastr.success('Logged In successfully!', 'Success');
          this.auth.currentUserSubject?.next(true);
          this.router.navigate(['/home']);
        }
      },
      (error: any) => {
        this.toastr.error('Invalid username or password!', 'Failed');
        this.spinner = false;
      }
    );
  }
}
