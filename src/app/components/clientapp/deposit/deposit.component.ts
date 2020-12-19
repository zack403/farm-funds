import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  dateRange : string = 'today';
  deposits : Array<any> = [];
  refreshing: boolean = false;
  

  constructor(
    private toastr: ToasterService,
    private authSvc: AuthService,
    private httpSv: HttpClient) {
      
  }

     

  ngOnInit(): void {
   this.getDeposits()
  }

  dateRangeChanged(event) {
    this.deposits = [];
    this.dateRange = event.target.value;
    this.getDeposits();
  }
  

  Refresh() {
    this.refreshing = true;
    this.getDeposits();
  }

  getDeposits() {
    const user = this.authSvc.getCurrentUserData();
    this.httpSv.get(`${environment.baseUrl}utility/deposits?id=${user.id}&dateRange=${this.dateRange}`).subscribe((res: any) => {
      
      
      if(res.Subscribers.length > 0) {
        for (const r of res.Subscribers) {
          r.package = 'Food Bank Subscription'
        }
      }

      this.deposits = [...res.Investments, ...res.Subscribers];
      console.log("dep", this.deposits);

      if(this.deposits.length === 0) {
        this.toastr.Info("No record found");
      }

      this.refreshing = false;

    })

  }

}
