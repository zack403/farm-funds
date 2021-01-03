import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {CanActivate} from "@angular/router";
import { Observable } from "rxjs";
import { Platform } from "@angular/cdk/platform";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private platform: Platform
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isLoggedIn()) {
      return true;
    }
   
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);

    if((this.platform.IOS || this.platform.ANDROID) && isInStandaloneMode) {
      this.router.navigateByUrl("login");
      return false;
    } 
    else {
      this.router.navigateByUrl("home");
      return false;
    
    }
  }
}