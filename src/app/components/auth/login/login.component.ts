import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isBusy: boolean = false;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authSvc: AuthService, private toasterSvc: ToasterService, public appCmpt: AppComponent) {}

  ngOnInit() {
    localStorage.removeItem("authData");
    localStorage.removeItem("token");
    localStorage.removeItem("interest");
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // password hide/show
  togglePassword() {
    if(!this.loginForm.value.password) return;
    this.showPassword = !this.showPassword;
  }

    onSubmit(model) {
      this.isBusy = true;
      this.authSvc.login(model ? model : this.loginForm.value).subscribe(res => {
        this.isBusy = false;
        if(!model){
          this.loginForm.reset();
        }
      
        if(res.data.isMigrated && !res.data.passwordChanged) {
          Swal.fire({
            title: 'Change your password to continue',
            html:
            '<input required placeholder="Old password" type="password" id="old" class="swal2-input" autofocus >' +
            '<input required placeholder="New Password" type="password" id="new" class="swal2-input">' +
            '<input required placeholder="Confirm New password" id="confirmnew" type="password" class="swal2-input">',
            showCloseButton: true,
            confirmButtonText: 'Update',
            confirmButtonColor: 'green',
            preConfirm: () => {
              let oldPassword = (<HTMLInputElement> document.getElementById('old')).value;
              let newPassword = (<HTMLInputElement> document.getElementById('new')).value;
              let confirmNewP = (<HTMLInputElement> document.getElementById('confirmnew')).value;
      
              if(oldPassword === '' || newPassword === '' || confirmNewP === '') {
                Swal.showValidationMessage("Old password/New password/Confirm New password is required"); // Show error when validation fails.
              } else if (oldPassword === newPassword || oldPassword === confirmNewP) {
                Swal.showValidationMessage("Old password cannot be the same with new password");
              } else if (newPassword != confirmNewP) {
                Swal.showValidationMessage("Confirm password must match New password"); // Show error when validation fails.
              } 
      
              return {
                oldPassword,
                newPassword,
                confirmNewP
              }
            }
      
          }).then( result => {
            if(result.value) {
              this.authSvc.changePassword(result.value).subscribe(s => {
                this.toasterSvc.Success('Password change successful. Redirecting...');
                this.router.navigateByUrl('app/foodbank-dashboard');
              });
            }
          })
        } else {
          this.router.navigateByUrl("app/foodbank-dashboard");
        }
      }, (error) => {
            console.log(error);
            this.isBusy = false;
      })
  }

  installPwa(): void {
    this.appCmpt.promptEvent.prompt();
  }

}
