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
  isBusy = false;

  constructor(private formBuilder: FormBuilder,
    private authSvc: AuthService, private toasterSvc: ToasterService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNo: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)]],
        bankName: ['', Validators.required],
        accountNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]*$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      }, {validator: this.passwordMatchValidator})
  }

     passwordMatchValidator(c: FormGroup) {
       return c.get('password').value === c.get("confirmPassword").value ? null : {mismatch : true};
     }

      onSubmit() {
         this.isBusy = true;
      //    this.authSvc.signup(this.registerForm.value).subscribe(res => {
      //      console.log(res);
      //      this.isBusy = false;
      //      this.toasterSvc.Success(res.message);
      // }, error => {
      //      console.log(error);
      //      this.isBusy = false;
      // })
    }

    // reset form
    onReset() {
      this.isBusy = false;
      this.registerForm.reset();
  }
}
