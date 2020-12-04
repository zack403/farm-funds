import { Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

declare var PaystackPop: any;

const inputOptions = {
  'card': 'card',
  'other' : 'other'
};

const formatter = new Intl.NumberFormat('en-NI', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
})

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})

export class WithdrawalComponent implements OnInit {
  // @ViewChild('editForm')  editForm: NgForm;
  userData: User;
  dashboardData: any;
  purchases: any;
  subscribers: any;
  pck: boolean = false;
  pl: boolean = false;
  emoji = '&#128591;&#127999';
  isBusy: boolean = false;
  sub: boolean = false;
  myWallet: number = 0;
  message: string;
  interest: number;
  paymentType: string;
  success: string;
  selected: boolean = false;
  showDetails: boolean = false;
  details: any;
  total: number;
  navigationSubscription;
  refreshing: boolean = false;

  constructor(private authSvc: AuthService, private router: Router,
    private profileSvc: ProfileService,
    private toastr: ToasterService,
    private utilSvc: UtilityService,
    private angularZone : NgZone,
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
      this.router.navigateByUrl('app/withdrawal');

      setTimeout(() => {
        this.refreshing = false;
      }, 3000);
    }
  ngOnInit(): void {
  }

  onComponentMounted() {
    const result = this.route.snapshot.data.user;
    this.userData = result[0].user;
    this.dashboardData = result[0].investments;
    this.purchases = result[0].purchases;
    this.subscribers = result[0].subscribers;
    console.log(result);
  }

  openModal(type) {
    document.getElementById('util').classList.add('modal-lg');
    if(type === 'newfarm'){
      document.getElementById(type).click();
      this.pl = false;
      this.pck = true;
      this.sub = false;
    }
    else if (type === 'subscribe') {
      document.getElementById(type).click();
      this.pl = false;
      this.pck = false
      this.sub = true;
    }
    else if(type === 'purchase') {
      document.getElementById(type).click();
      this.pck = false;
      this.pl = true;
      this.sub = false;
    }
    else {
      this.pl = false;
      this.pck = false;
      this.sub = false;
      document.getElementById('util').classList.remove('modal-lg');
      document.getElementById('util').classList.add('modal-sm');
      document.getElementById(type).click();
    }
  }

  monthDiff(d1) {
    let months;
    let d2 = new Date();
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
}
