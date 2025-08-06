import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { RegistrationService } from '../../../../services/registration-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  userRegistrationModel:any=[]

  constructor(private fb: FormBuilder, private toastr: ToastrService,private registrationService:RegistrationService,private router:Router) {
    this.registerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isEmailVerified:[false],
      dateOfJoining:[],
      phoneNumber:[null,Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

 onSubmit() {
  this.submitted = true;

  if (this.registerForm.invalid) {
    return;
  }

  this.userRegistrationModel = Object.assign({},this.registerForm.value)

  this.registrationService.register(this.registerForm.value).subscribe(
    (response: any) => {
      if (response?.output?.token) {
        localStorage.setItem('newsLoginToken', response.output.token);

        this.toastr.success('Registered successfully!', 'Success');

        this.router.navigate(['/home']).then(() => {
          // Reload only if necessary
          window.location.reload();
        });
      } else {
        this.toastr.error('Token not received from server.', 'Error');
      }
    },
    (error: any) => {
      this.toastr.error('Error while registering!', 'Error');
    }
  );
}


  reset() {
    this.registerForm.reset();
    this.submitted = false;
  }
}
