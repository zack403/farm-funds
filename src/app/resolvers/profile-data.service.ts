import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { mergeMap, take } from 'rxjs/operators';
import { of, EMPTY, forkJoin } from 'rxjs';
import { ToasterService } from '../services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService implements Resolve<any> {

  constructor(private profSvc: ProfileService, 
    private authSvc: AuthService, 
    private router: Router,
    private toastr: ToasterService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    const user = this.authSvc.getCurrentUserData();

    return forkJoin([this.profSvc.getMyDetails(user.id), this.profSvc.getDashboardData(user.id)]).pipe(
        take(1),
        mergeMap((u: any) => {
            if(u) return of(u);
            this.router.navigateByUrl('home');
            this.toastr.Error("Problem retrieving data...")
            return EMPTY;
      }))
  }
}
