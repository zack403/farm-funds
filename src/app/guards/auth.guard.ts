import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {CanActivate} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl("home");
    return false;
  }
}