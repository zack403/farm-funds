import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.css']
})
export class TopSectionComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authSvc.isLoggedIn();
  }

}
