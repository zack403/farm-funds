import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  isBusy: boolean = false;
  constructor(private formBuilder: FormBuilder, private utilSvc: UtilityService, private toastrSvc: ToasterService) { }

  ngOnInit() {
    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required]]
    });
  }

  sendUsAMessage() {
    this.isBusy = true;
    this.utilSvc.contactUs(this.contactUsForm.value).subscribe((res: any) => {
      this.isBusy = false;
      this.toastrSvc.Success(res.message);
      this.contactUsForm.reset();
    }, (error) => {
        this.isBusy = false;
    })
  }

}
