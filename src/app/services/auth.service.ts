import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import {tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(private httpService: HttpService, 
    private router : Router) { }

  signup(model: any): Observable<any> {
    return this.httpService.post('auth/register', model)
      .pipe(tap(res => {
        return res;
      }));
  }
  
    login(model: any) {
      return this.httpService.post('auth/login', model)
        .pipe(tap(async (res: any) => {
          console.log(res);
          if(res.data){
            localStorage.setItem("authData", JSON.stringify(res.data));   
            localStorage.setItem("token", res.token);                     
            return res;
          }
        }));
    }
  
    logout() {
        localStorage.removeItem("authData");
        localStorage.removeItem("token");
        localStorage.removeItem("interest");
        this.router.navigateByUrl("home");
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
      return this.httpService.post(`req-reset-password`, body);
    }
  
    newPassword(body): Observable<any> {
      return this.httpService.post(`new-password`, body);
    }
  
    ValidPasswordToken(body): Observable<any> {
      return this.httpService.post(`valid-password-token`, body);
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

}
