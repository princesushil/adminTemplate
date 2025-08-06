import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.html' ,
  standalone:false,
 
})
export class ForgetPassword {
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email;
    // Send email to backend here
    console.log('Reset link sent to:', email);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
