import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import {tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@angular/cdk/platform';


const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  installed: boolean = false;

  constructor(private httpService: HttpService, 
    private router : Router, private platform : Platform) { 
    }

  signup(model: any): Observable<any> {
    return this.httpService.post('auth/register', model)
      .pipe(tap(res => {
        return res;
      }));
  }
  
    login(model: any) {
      return this.httpService.post('auth/login', model)
        .pipe(tap(async (res: any) => {
          if(res.data){
            localStorage.setItem("authData", JSON.stringify(res.data));   
            localStorage.setItem("token", res.token);                     
            return res;
          }
        }));
    }
  
    logout() {
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
        if((this.platform.IOS || this.platform.ANDROID) && isInStandaloneMode) {
          this.router.navigateByUrl("login");
        } else {
          localStorage.removeItem("authData");
          localStorage.removeItem("token");
          localStorage.removeItem("interest");
          this.router.navigateByUrl("home");
        }
    }
  
    isLoggedIn() {
      const token = localStorage.getItem("token");    
      const isTokenExpired = helper.isTokenExpired(token);
      if(!isTokenExpired){
        return true;
      }
      return false;
    }
  
   getCurrentUserData() {
      this.currentUser = JSON.parse(localStorage.getItem("authData"));
      if (this.currentUser) {
          return this.currentUser;
      } else {
          return this.currentUser = null;
      }
    }
  
    requestReset(body): Observable<any> {
      return this.httpService.post(`auth/req-reset-password`, body);
    }
  
    newPassword(body): Observable<any> {
      return this.httpService.post(`auth/new-password`, body);
    }
  
    ValidPasswordToken(body): Observable<any> {
      return this.httpService.post(`auth/valid-password-token`, body);
    }

    handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }

  changePassword(model: any) {
    return this.httpService.post('auth/change-password', model)
      .pipe(tap(async (res: any) => {                    
          return res;    
    }));
  }

}
