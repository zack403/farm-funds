import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpSvc: HttpService) { }

  getMyDetails(id: string) {
    return this.httpSvc.getById('users/', id).pipe(
      tap(res => {
        return res;
      })
    );
  }

  updateMe(data: User) {
    return this.httpSvc.put('users/', data).pipe(
      tap(res => {
        return res;
      })
    );
  }

  getDashboardData(id: string) {
    return this.httpSvc.getById('dashboard/', id).pipe(
      tap(res => {
        return res;
      })
    );
  }

}
