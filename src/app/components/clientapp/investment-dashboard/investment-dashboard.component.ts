import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-investment-dashboard',
  templateUrl: './investment-dashboard.component.html',
  styleUrls: ['./investment-dashboard.component.css']
})

export class InvestmentDashboardComponent implements OnInit {
  userData: User;
  dashboardData: any;
  navigationSubscription;
  refreshing: boolean = false;
  myWallet: number = 0;


  constructor(private router: Router,
    private route: ActivatedRoute) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.onComponentMounted();
        }
      });
     }

     Refresh() {
      this.refreshing = true;
      this.router.navigateByUrl('app/investment-dashboard');

      setTimeout(() => {
        this.refreshing = false;
      }, 3000);
    }

  ngOnInit(): void {
  }

  onComponentMounted() {
    const result = this.route.snapshot.data.foodinvdata;
    this.userData = result[0].user;
    this.dashboardData = result[0].investments;
  }


  newFarm() {
    this.router.navigateByUrl("app/packages")
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}

