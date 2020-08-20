import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }

  uploadProofOfPayment(data) : Observable<any> {
    return this.http.post(`${environment.baseUrl}utility/proofofpayment`, data).pipe(tap(res => {
      return res;
    }))
  }
}
