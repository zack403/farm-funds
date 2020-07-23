import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm')  editForm: NgForm;
  loggedIn: boolean;
  currentUser: User;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authSvc.isLoggedIn();
    this.currentUser = this.authSvc.getCurrentUserData();
  }

  logout() {
    this.authSvc.logout();
  }

}
