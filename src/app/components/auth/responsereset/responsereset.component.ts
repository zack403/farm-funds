import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-responsereset',
  templateUrl: './responsereset.component.html',
  styleUrls: ['./responsereset.component.css']
})
export class ResponseresetComponent implements OnInit {

  responseForm: FormGroup;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  isBusy: boolean = false;
  showPassword: boolean = false;
  showConfirm: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrSvs: ToasterService,
    private fb: FormBuilder ) {

    this.CurrentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      console.log(this.resetToken);
      this.VerifyToken();
    });
  }


  ngOnInit() {

    this.Init();
  }

  VerifyToken() {
    this.authService.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  // password hide/show
  togglePassword() {
    if(!this.responseForm.value.newPassword) return;
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    if(!this.responseForm.value.confirmPassword) return;
    this.showConfirm = !this.showConfirm;
  }

     passwordMatchValidator(c: FormGroup) {
       return c.get('newPassword').value === c.get("confirmPassword").value ? null : {mismatch : true};
     }

  Init() {
    this.responseForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {validator: this.passwordMatchValidator}
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword(form) {
    console.log(form.get('confirmPassword'));
    if (form.valid) {
      this.IsResetFormValid = true;
      this.isBusy = true;
      this.authService.newPassword(this.responseForm.value).subscribe(
        data => {
          this.isBusy = false;
          this.responseForm.reset();
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
          this.toastrSvs.Success(data.message);
        },
        err => {
          this.isBusy = false;
          this.IsResetFormValid = false;
          
        }
      );
    } else { 
      this.isBusy = false;
      this.IsResetFormValid = false;
     }
  }

}
