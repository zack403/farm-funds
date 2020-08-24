import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient, private httpSvc: HttpService) { }

  uploadProofOfPayment(data) : Observable<any> {
    return this.http.post(`${environment.baseUrl}utility/proofofpayment`, data).pipe(tap(res => {
      return res;
    }))
  }

  saveItems(data: Cart) {
    return this.httpSvc.post("purchase", data).pipe(tap(res => {
      return res;
    }))
  }
}
