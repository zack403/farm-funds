import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UtilityService } from 'src/app/services/utility.service';

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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm')  editForm: NgForm;
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

  constructor(private authSvc: AuthService, private router: Router, 
    private profileSvc: ProfileService,
    private toastr: ToasterService,
    private utilSvc: UtilityService,
    private angularZone : NgZone,
    private route: ActivatedRoute) { }


  ngOnInit() {
    const result = this.route.snapshot.data.user;
    this.userData = result[0].data;
    this.dashboardData = result[1].investments;
    this.purchases = result[1].purchases;
    this.subscribers = result[1].subscribers;
    console.log(result)
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


  updateProfile() {
    this.isBusy = true;
    this.profileSvc.updateMe(this.userData).subscribe((res: any) => {
      this.toastr.Success(res.data);
      this.isBusy = false;
    }, err => {
      this.isBusy = false;
      console.log(err);
    })
  }

  deposit(amt, data) {
    amt *= 100000;
    this.interest = (amt * 5) / 100;
     const that = this;
     const {email, firstName, lastName} = this.authSvc.getCurrentUserData();
       try {
           var handler = PaystackPop.setup({
             key: 'pk_test_801d715bb68f121b21aac949a0f65b3a93dfb3d0',
             email: email,
             amount: amt*100,
             currency: "NGN",
             firstname: firstName,
             lastname: lastName,
 
             callback: function(response){
               if(response.reference) {
                 Swal.fire({
                   title: 'Success',
                   html: `<p>Your payment is successful, your transaction reference is ${response.reference}. Click proceed to select items worth your interest.</p>`,
                   confirmButtonColor: 'green',
                   icon: 'success',
                   allowOutsideClick: false,
                   allowEscapeKey: false,
                   confirmButtonText: "Proceed"
                 }).then(res => {
                   if(res) {
                     that.angularZone.run(() => {
                      that.utilSvc.uploadProofOfPayment(data).subscribe((res:any) => {
                        that.router.navigateByUrl("app/farmify-shopping", { state: { interest: that.interest} });
                      })
                     })
                   }
                 })
               }
             },
             onClose: function(){
             }
           });
           handler.openIframe(); 
       } catch (error) {
         that.toastr.Error(error);
         console.log("PayStackError",error);
       }
   }
 

  

  openswal() {
    if(this.subscribers.subs[0].paymentType === 'Transfer' && this.subscribers.subs[0].status === 'Pending') {
      return this.toastr.Info("Please wait for your subscription to be confirmed before adding items.");
    } else {
      if(this.purchases.length> 0 && this.purchases[0].status === 'Pending') {
        return this.toastr.Info("You cannot add items now as you have a pending order.");
      }
      if(new Date(this.subscribers.subs[0].endDate) > new Date()) {
        return this.toastr.Info("You still have a running subscription, Please wait till it expires before subscribing again.");
      }
    }
    Swal.fire({
      html: '<hr><br><p class="text-left text-dark">Farmify Agro Innovations Ltd  is duly registered AgriTech Firm, established to empower African Farmers whilst enabling individual Farmfunders earn profits on their farm partnership which ultimately helps in strenghtening global food security.</p><br>' +
      '<p class="text-left text-dark">Sponsor our Greenhouse Vegetable Farm for just &#8358;100,000 per unit and get 60% ROI within the space of 1 year.</p><br>' +
      '<p class="text-left text-dark">The 60% will be broken down into 12 parts which means you will be paid 5% of your ROI monthly in form of Groceries, Foodstuffs and Household items.</p><br>' +
      '<p class="text-left text-dark">After a whole year of grocery shopping for your home, you get a whopping 70% of your capital back</p><br>' +
      '<p class="text-left text-dark">The remaining 30% will be used as your service charge throughout the year which includes the delivery to your doorstep.</p><br>' +
      '<p class="text-left text-dark">In other words, within a year, you spent just 30% of your investment on grocery shopping and household items.</p><br><hr>',
      imageUrl: 'assets/images/farmify-slide.jpeg',
      width: 800,
      imageHeight: 300,
      imageWidth: 700,
      input: 'number',
      inputAttributes: {
        'min' : 1
      },
      inputPlaceholder: 'Unit',
      confirmButtonColor: 'green',
      confirmButtonText: "Subscribe",
      inputValidator: (value) => {
        if (!value) {
          return 'Please input unit!'
        }
      }
    }).then( async res => {
      if(res.value) {
        const { value: answer } = await Swal.fire({
          title: 'Choose payment method',
          input: 'radio',
          confirmButtonColor: 'green',
          inputOptions: inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return 'Please select one of the options above.'
            }
          }
        });

        if(answer === 'card') {
          this.paymentType = "Card";
          const formData = new FormData();
          formData.append('name', this.userData.middleName ? `${this.userData.firstName} ${this.userData.middleName} ${this.userData.lastName}` : `${this.userData.firstName} ${this.userData.lastName}`);
          formData.append('phoneNo', this.userData.phoneNo);
          formData.append('UserId', this.userData.id);
          formData.append('paymentType', this.paymentType);
          formData.append('unit', res.value);
          formData.append('email', this.userData.email);
          this.deposit(parseInt(res.value), formData);
        }
        else if (answer === 'other') {
          this.paymentType = "Transfer";
          const fee = res.value * 100000;
          this.interest = (res.value * 5) / 100;
          const { value: file } = await Swal.fire({
            title: `Partnership fee ${formatter.format(fee)}`,
            html:'<hr><br><p class="text-left text-dark font-weight-bold">BANK NAME: &nbsp;&nbsp;&nbsp; Access Bank</p><br>' +
            '<p class="text-left text-dark font-weight-bold">ACCOUNT NAME: &nbsp;&nbsp; Farmify Agro Innovations Ltd.</p><br>' +
            '<p class="text-left text-dark font-weight-bold">ACCOUNT NUMBER: &nbsp;&nbsp;&nbsp; 1404450358</p><br><hr>' +
            '<strong>Please upload your proof of payment.</strong>',
            input: 'file',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Please choose proof of payment'
              }
            },
            preConfirm: (event) => {
              const formData = new FormData();
              formData.append('name', this.userData.middleName ? `${this.userData.firstName} ${this.userData.middleName} ${this.userData.lastName}` : `${this.userData.firstName} ${this.userData.lastName}`);
              formData.append('phoneNo', this.userData.phoneNo);
              formData.append('UserId', this.userData.id);
              formData.append('paymentType', this.paymentType);
              formData.append('unit', res.value);
              formData.append("proofofpayment", event);
              formData.append('email', this.userData.email);
              this.utilSvc.uploadProofOfPayment(formData).subscribe((res:any) => {
                console.log(res.message);
                this.success = res.message;
              })
            },
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your proof of payment'
            }
          });
        }
      }
    })
  }

  viewOrder(id) {
    const item = this.purchases.find(x => x.id === id);
    if(item){
      this.showDetails = true;
      this.details = item.PurchaseDetails;
    }
  }

  back() {
    this.showDetails = false;
  }

  AddItems() {
    let delDate = new Date(this.purchases[0].deliveredDate);
    if(this.subscribers.subs[0].paymentType === 'Transfer' && this.subscribers.subs[0].status === 'Pending') {
      return this.toastr.Info("Please wait for your subscription to be confirmed before adding items.");
    } else {
      if(this.purchases.length > 0 && this.purchases[0].status === 'Pending') {
        return this.toastr.Info("You cannot add items now as you have a pending order.");
      }
      if(this.purchases.length > 0 && new Date(delDate.setDate(delDate.getDate() + 2 * 7)) != new Date()) {
        return this.toastr.Info("You cannot add items now as you have a pending order.");
      }
    }

    this.interest = (this.subscribers.amount) * 5 / 100
    this.router.navigateByUrl("app/farmify-shopping", { state: { interest: this.interest} });
  }
}
