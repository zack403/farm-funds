import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';

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
    private authSvc: AuthService, private toasterSvc: ToasterService) {}

  ngOnInit() {
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
        this.router.navigateByUrl("app/profile");
      }, (error) => {
            console.log(error);
            this.isBusy = false;
      })
  }

}
