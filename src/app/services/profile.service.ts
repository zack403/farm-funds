import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Cacheable } from 'ngx-cacheable';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpSvc: HttpService) { }

  @Cacheable()
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

  @Cacheable()
  getDashboardData(id: string) {
    return this.httpSvc.getById('dashboard/', id).pipe(
      tap(res => {
        return res;
      })
    );
  }

}
