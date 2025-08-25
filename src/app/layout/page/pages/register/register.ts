import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../../../services/registration-service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../cores/functions/passwordMatchValidator';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  userRegistrationModel: any = []

  constructor(private fb: FormBuilder, private toastr: ToastrService, private registrationService: RegistrationService, private router: Router) {
    this.registerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator() });

  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userRegistrationModel = Object.assign({}, this.registerForm.value)

    this.registrationService.register(this.registerForm.value).subscribe(
      (response: any) => {
        if (response) {
          // localStorage.setItem('newsLoginToken', response.output.token);

          this.toastr.success('Registered successfully! please login', 'Success');
          this.router.navigate(['/login']);

        } else {
          this.toastr.error('Token not received from server.', 'Error');
        }
      },
      (error: any) => {
        if (error?.error?.failureReason) {
          this.toastr.error(error?.error?.failureReason, 'Error');
          return
        }
        this.toastr.error('Error while registering!', 'Error');
      }
    );
  }


  reset() {
    this.registerForm.reset();
    this.submitted = false;
  }
}
