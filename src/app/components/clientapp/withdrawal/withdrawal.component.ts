import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})

export class WithdrawalComponent implements OnInit {

  dateRange : string = 'today';
  withdrawals : Array<any> = [];
  refreshing: boolean = false;
  currentDate: any;
  

  constructor(
    private toastr: ToasterService,
    private authSvc: AuthService,
    private httpSv: HttpClient) {
      
  }

     

  ngOnInit(): void {
   this.getWithdrawals();
   this.currentDate = new Date();
  }

  dateRangeChanged(event) {
    this.withdrawals = [];
    this.dateRange = event.target.value;
    this.getWithdrawals();
  }
  

  Refresh() {
    this.refreshing = true;
    this.getWithdrawals();
  }

  getWithdrawals() {
    const user = this.authSvc.getCurrentUserData();
    this.httpSv.get(`${environment.baseUrl}utility/withdrawals?id=${user.id}&dateRange=${this.dateRange}`).subscribe((res: any) => {
      console.log("with", res);

      if(res.Subscribers.length > 0) {
        for (const r of res.Subcribers) {
          r.package = 'Food Bank Subscription'
        }
      }

      this.withdrawals = [...res.Investments, ...res.Subscribers];
      console.log("with", this.withdrawals);
      if(this.withdrawals.length === 0) {
        this.toastr.Info("No record found");
      }

      this.refreshing = false;
    })
  }

 
  requestWithdrawal(item) {
    item.endDate = new Date(item.endDate);
    item.userId = this.authSvc.getCurrentUserData().id;
    
    if(this.currentDate < item.endDate) {
      let diffInTime = item.endDate.getTime() - this.currentDate.getTime();
      let waitTime = diffInTime / (1000 * 3600 * 24);
      return this.toastr.Error(`You cannot request for a withdrawal at this time. Wait for ${waitTime.toFixed(0)} days.`);
    }

    this.httpSv.post(`${environment.baseUrl}utility/request`, item).subscribe((res: any) => {
        if(res.data) {
          this.toastr.Success(res.data);
        }
    })
  }


}
