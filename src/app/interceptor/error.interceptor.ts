import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpEvent,HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap  } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private toastr: ToasterService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(() => {}, (err: any) =>  {
            if ([401, 403].includes(err.status)) {
                this.authService.logout();
            }
            const error = err.error.error || err.error.detail || err.statusText;
            if(error === 'Unknown Error'){
                this.toastr.Error("Error while communicating with the server, Please try again.");
                return;
            }
            this.toastr.Error(error);
            return throwError(error);
        }));
    }
}

