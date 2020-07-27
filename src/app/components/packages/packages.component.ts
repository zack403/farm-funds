import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/packages.model';
import { PackagesService } from 'src/app/services/packages.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packagesList: Array<Package>;


  constructor(private pckSvc: PackagesService, private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.packagesList = this.pckSvc.getPackages();
  }

  subscribeToAPackage() {
    if(this.authSvc.isLoggedIn()){
      console.log("loggedIn");
    }
    else {
      this.router.navigateByUrl("login");
    }

  }

}
