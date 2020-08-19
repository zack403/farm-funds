import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userapp-header',
  templateUrl: './userapp-header.component.html',
  styleUrls: ['./userapp-header.component.css']
})
export class UserappHeaderComponent implements OnInit {
  userData: User;
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userData = this.authSvc.getCurrentUserData();;
  }

  logout() {
    this.authSvc.logout();
  }

  go() {
    this.router.navigateByUrl("app/profile")
  }

}
