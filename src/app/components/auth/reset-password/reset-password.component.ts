import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  recoverForm: FormGroup;
  isBusy: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authSvc: AuthService, private toasterSvc: ToasterService) {}

    ngOnInit() {
      this.recoverForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }

    onSubmit() {
      this.isBusy = true;
    }
}
