import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  recoverForm: FormGroup;
  isBusy: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authSvc: AuthService, private router: Router, private toasterSvc: ToasterService) {}

    ngOnInit() {
      this.recoverForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }

    onSubmit(form) {
      if (form.valid) {
        this.isBusy = true;
        this.authSvc.requestReset(this.recoverForm.value).subscribe(
          data => {
            this.recoverForm.reset();
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
            this.toasterSvc.Success("Reset password link sent to email sucessfully. Please check your mail.");
          },
          err => {
            this.isBusy = false;
          }
        );
      } else {
        this.isBusy = false;
      }
    }
}
