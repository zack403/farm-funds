import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  packages = [
    {
      id: 1, packageName: 'PIG FARM', profit: 30, cycle: 270, packageImage: '../../../../assets/images/shop/pig.JPG',
      location: 'Ijebu ode', unit: 749
    },
    {
      id: 2, packageName: 'CHICKEN FARM', profit: 20, cycle: 120, packageImage: '../../../../assets/images/chicken.JPG',
      location: 'Ilorin', unit: 0
    },
    {
      id: 3, packageName: 'TURKEY FARM', profit: 23, cycle: 150, packageImage: '../../../../assets/images/shop/turkey.JPG',
      location: 'Ilaro', unit: 847
    },
    {
      id: 4, packageName: 'GOAT FARM', profit: 38, cycle: 240, packageImage: '../../../../assets/images/shop/goat.JPG',
      location: 'Ilaro', unit: 4182
    },
    {
      id: 5, packageName: 'MECHANIZED PROCESSING FARM', profit: 50, cycle: 360, packageImage: '../../../../assets/images/big-farm.jpeg',
      location: 'Lagos', unit: 0
    },
    {
      id: 6, packageName: 'FISH FARM', profit: 27.5, cycle: 180, packageImage: '../../../../assets/images/fish.JPG',
      location: 'Odogbolu', unit: 0
    }
  ]

  constructor(private httpSvc: HttpService, private http: HttpClient) { }

  // getPackages() {
  //   return this.packages;
  // }

  // getPackagesById(id: number) {
  //   return this.packages.find(x => x.id === id);
  // }


  getPackages(page, size, search) {
    return this.httpSvc.get(`package?page=${page}&size=${size}&search=${search}`).pipe(tap(res => {
      return res;
    }))
  }

  getPackagesById(id: any){
    return this.httpSvc.getById('package/', id).pipe(tap(res => {
      return res;
    }))
  }

  AddSubscription(data) {
    return this.http.post(`${environment.baseUrl}investment`, data).pipe(tap(res => {
      return res;
    }))
  }

}
