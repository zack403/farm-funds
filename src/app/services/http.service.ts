import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  requestHeaders () {
    const headers = new HttpHeaders().set("Content-Type" , "Application/json");
    const options = { headers: headers };
    return options;
  }
  
  get(endPoint: string) {
      return this.http.get(this.baseUrl + endPoint);
  }

  getById(endPoint: string, id){
    return this.http.get(this.baseUrl + endPoint + id);
  }

  post(endPoint: string, data: any) {      
    return this.http.post(this.baseUrl + endPoint, JSON.stringify(data), this.requestHeaders());
  }
  
  put(endPoint: string, data: any) {
    return this.http.put(this.baseUrl + endPoint, JSON.stringify(data), this.requestHeaders());
  }

  delete(endPoint: string) {
    return this.http.delete(this.baseUrl + endPoint);
  }

  patch(endPoint: string, data: any) {
    return this.http.put(this.baseUrl + endPoint, JSON.stringify(data));
  }
}
