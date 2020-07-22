import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import {tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService, 
    private router : Router) { }

  signup(model: any): Observable<any> {
    return this.httpService.post('signup', model)
      .pipe(tap(res => {
        return res;
      }));
  }
  
    login(model: any) {
      return this.httpService.post('login', model)
        .pipe(tap(async (res: any) => {
          console.log(res);
          if(res){
            
            return res;
          }
        }));
    }
  
    logout() {
        localStorage.removeItem("authData");
        localStorage.removeItem("token");
        this.router.navigateByUrl("login");
    }
  
    isLoggedIn() {
      const token = localStorage.getItem("token");    
      const isTokenExpired = helper.isTokenExpired(token);
      if(isTokenExpired){
        return true
      }
      return false;
    }
  
  //  getCurrentUserData() {
  //     this.currentUser = localStorage.getItem("authData");
  //     if (this.currentUser) {
  //         if (this.currentUser.companyName && this.currentUser.auth_token) {
  //             return this.currentUser;
  //         } else {
  //             return this.currentUser = null;
  //         }
  //     } else {
  //         return this.currentUser = null;
  //     }
  //   }
  
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
