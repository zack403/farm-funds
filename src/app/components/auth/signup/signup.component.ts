import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private authSvc: AuthService, private toasterSvc: ToasterService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        otherName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required, Validators.pattern],
        bankName: ['', Validators.required],
        accountNo: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

      // convenience getter for easy access to form fields
      get f() { return this.registerForm.controls; }

      onSubmit() {
         this.submitted = true;
         this.authSvc.signup(this.registerForm.value).subscribe(res => {
           console.log(res);
           this.submitted = false;
           this.toasterSvc.Success(res.message);
      }, error => {
           console.log(error);
           this.submitted = false;
      })
    }

    // reset form
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
