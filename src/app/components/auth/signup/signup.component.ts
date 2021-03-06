import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  isBusy = false;
  showPassword: boolean = false;
  showConfirm: boolean = false;
  banks: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authSvc: AuthService, private toasterSvc: ToasterService, private loginCmpt: LoginComponent, private utilSvc: UtilityService) {}

  ngOnInit() {
    this.banks = this.utilSvc.getBanks();
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNo: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)]],
        bankName: [this.banks[0].name],
        acctNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]*$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      }, {validator: this.passwordMatchValidator})

  }

  // password hide/show
  togglePassword() {
    if(!this.registerForm.value.password) return;
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    if(!this.registerForm.value.confirmPassword) return;
    this.showConfirm = !this.showConfirm;
  }

     passwordMatchValidator(c: FormGroup) {
       return c.get('password').value === c.get("confirmPassword").value ? null : {mismatch : true};
     }

      onSubmit() {
         delete this.registerForm.value.acceptTerms;
         this.isBusy = true;
         this.authSvc.signup(this.registerForm.value).subscribe(res => {
           console.log(res);
           this.isBusy = false;
           this.toasterSvc.Success(res.message);
          
           //log user in upon successful registration
           const model = {
             email: this.registerForm.value.email,
             password: this.registerForm.value.password
           }

           this.registerForm.reset();
           this.loginCmpt.onSubmit(model);
           
      }, (error) => {
           this.isBusy = false;
           console.log(error);
      })
    }

    // reset form
    onReset() {
      this.isBusy = false;
      this.registerForm.reset();
  }

  onChange(value) {
    this.registerForm.value.bankName = value;
  }
}
