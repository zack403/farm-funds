import { Component, OnInit, Input } from '@angular/core';
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
  @Input() shouldShow : boolean = true;
  isBusy: boolean;
  unit = 0



  constructor(private pckSvc: PackagesService, private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.packagesList = this.pckSvc.getPackages();
  }

  onSubmit() {
    this.isBusy = true;
  }

  subscribeToAPackage() {
    return       document.getElementById('unit').click(); 

    if(this.authSvc.isLoggedIn()){
      document.getElementById('unit').click(); 
    }
    else {
      this.router.navigateByUrl("login");
    }

  }

}
