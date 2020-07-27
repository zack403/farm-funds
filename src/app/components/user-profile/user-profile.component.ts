import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

declare var PaystackPop: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm')  editForm: NgForm;
  loggedIn: boolean;
  currentUser: User;
  userData: User;
  dashboardData: any;
  purchases: any;
  pck: boolean = false;
  pl: boolean = false;
  emoji = '&#128591;&#127999';
  isBusy: boolean = false;
  sub: boolean = false;

  constructor(private authSvc: AuthService, private router: Router, 
    private profileSvc: ProfileService,
    private toastr: ToasterService) { }

  ngOnInit() {
    this.loggedIn = this.authSvc.isLoggedIn();
    this.currentUser = this.authSvc.getCurrentUserData();
    this.onLoad();
  }

  logout() {
    this.authSvc.logout();
  }

  getUser(){
    this.profileSvc.getMyDetails(this.currentUser.id).subscribe((res: any ) => {
      this.userData = res.data;
      console.log("userdt", this.userData);
    }, error => {
      console.log("userdt", error);
    })
  }

  getDashDta() {
    this.profileSvc.getDashboardData(this.currentUser.id).subscribe((res: any) => {
      console.log("dash", res);
      this.dashboardData = res.investments;
      this.purchases = res.purchases;
    }, err => {
      console.log("dasherr", err);
    })
  }

  openModal(val) {
    if(val === 'newfarm'){
      document.getElementById(val).click();
      this.pl = false;
      this.pck = true;
      this.sub = false;
    }
    else if (val === 'subscribe') {
      document.getElementById(val).click();
      this.pl = false;
      this.pck = false
      this.sub = true;
    }
    else {
      document.getElementById(val).click();
      this.pck = false;
      this.pl = true;
      this.sub = false;
    }
  }

  onLoad(){
    this.getDashDta();
    this.getUser();
  }

  updateProfile() {
    this.isBusy = true;
    this.profileSvc.updateMe(this.userData).subscribe((res: any) => {
      this.toastr.Success(res.data);
      this.isBusy = false;
    }, err => {
      this.isBusy = false;
      console.log(err);
    })
  }

  deposit() {
    const that = this;
    const {email, firstName, lastName} = this.authSvc.getCurrentUserData();
      try {
          var handler = PaystackPop.setup({
            key: 'pk_test_801d715bb68f121b21aac949a0f65b3a93dfb3d0',
            email: email,
            amount: 150000,
            currency: "NGN",
            firstname: firstName,
            lastname: lastName,

            callback: function(response){
                that.toastr.Success(`Deposit Successful, your transaction reference is ${response.reference}`);
            },
            onClose: function(){
                alert('You may want to complete your payment.');
            }
          });
          handler.openIframe(); 
      } catch (error) {
        console.log("PayStackError",error);
      }

  }

}
