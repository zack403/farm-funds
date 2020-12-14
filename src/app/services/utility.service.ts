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

  banks = [
    { "id": "1", "name": "Access Bank" ,"code":"044" },
    { "id": "2", "name": "Citibank","code":"023" },
    { "id": "3", "name": "Diamond Bank","code":"063" },
    { "id": "4", "name": "Dynamic Standard Bank","code":"" },
    { "id": "5", "name": "Ecobank Nigeria","code":"050" },
    { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
    { "id": "7", "name": "First Bank of Nigeria","code":"011" },
    { "id": "8", "name": "First City Monument Bank","code":"214" },
    { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
    { "id": "10", "name": "Heritage Bank Plc","code":"030" },
    { "id": "11", "name": "Jaiz Bank","code":"301" },
    { "id": "12", "name": "Keystone Bank Limited","code":"082" },
    { "id": "13", "name": "Providus Bank Plc","code":"101" },
    { "id": "14", "name": "Polaris Bank","code":"076" },
    { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
    { "id": "16", "name": "Standard Chartered Bank","code":"068" },
    { "id": "17", "name": "Sterling Bank","code":"232" },
    { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
    { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
    { "id": "20", "name": "United Bank for Africa","code":"033" },
    { "id": "21", "name": "Unity Bank Plc","code":"215" },
    { "id": "22", "name": "Wema Bank","code":"035" },
    { "id": "23", "name": "Zenith Bank","code":"057" }
];

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

  contactUs(data) {
    return this.httpSvc.post("utility/contactus", data).pipe(tap(res => {
      return res;
    }))
  }

  sendFeedback(data) {
    return this.httpSvc.post("utility/feedback", data).pipe(tap(res => {
      return res;
    }))
  }

  GetUserNotifications(userId) {
    return this.httpSvc.getById("utility/notifications/", userId).pipe(tap(res => {
      return res;
    }))
  }

  getBanks() {
    return this.banks;
  }
}
