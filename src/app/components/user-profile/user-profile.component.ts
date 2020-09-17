import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
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
  total: number;
  navigationSubscription;



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
      this.router.navigateByUrl('app/profile');
    }

  ngOnInit() {
    this.onComponentMounted();
  }

  onComponentMounted() {
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
             key: 'pk_test_e7861b0c2ca5ed383dc4d2934270218b5a88e292',
             email: email,
             amount: amt*100,
             currency: "NGN",
             firstname: firstName,
             lastname: lastName,

             callback: function(response){
               if(response.reference) {
                 Swal.fire({
                   title: 'Success',
                   text: `Your payment is successful, your transaction reference is ${response.reference}. Click proceed to select items worth your interest.`,
                   confirmButtonColor: 'green',
                   icon: 'success',
                   allowOutsideClick: false,
                   allowEscapeKey: false,
                   confirmButtonText: "Proceed"
                 }).then(res => {
                   if(res) {
                     that.angularZone.run(() => {
                      that.utilSvc.uploadProofOfPayment(data).subscribe((res:any) => {
                        localStorage.setItem("subId", res.message);
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
         that.toastr.Error("Error while launching payment screen, please try again.");
         console.log("PayStackError",error);
       }
   }




  openswal() {
    // if(this.subscribers.subs.length > 0) {
    //   if(this.subscribers.subs[0].paymentType === 'Transfer' && this.subscribers.subs[0].status === 'Pending') {
    //     return this.toastr.Info("Please wait for your subscription to be confirmed before adding items.");
    //   } else {
    //     if(this.purchases.length > 0 && this.purchases[0].status === 'Pending') {
    //       return this.toastr.Info("You still have a running subscription, Please wait till it expires before subscribing again.");
    //     }
    //     if(new Date(this.subscribers.subs[0].endDate) > new Date()) {
    //       return this.toastr.Info("You still have a running subscription, Please wait till it expires before subscribing again.");
    //     }
    //   }
    // }
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
        if (!value || value < 1) {
          return 'Your input is not valid!'
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
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your proof of payment'
            },
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
                this.success = "Your file has been uploaded successfully, You will be notified when your subscription has been confirmed and activated.. Thanks.";
                this.router.navigateByUrl('app/profile');
              })
            },
            allowOutsideClick: () => !Swal.isLoading()
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
      this.total = item.amount;
    }
  }

  back() {
    this.showDetails = false;
  }


  AddItems() {
  if(this.subscribers.subs.length > 1) {
    this.chooseSubToBuyFrom();
  }
  else {
    let deliveryDateDate;
    if(this.purchases.length > 0){
      if(this.purchases[0].deliveredDate) {
        deliveryDateDate = new Date(this.purchases[0].deliveredDate);
        deliveryDateDate = new Date(deliveryDateDate.setDate(deliveryDateDate.getDate() + 2 * 7));
      }
      if(this.subscribers.subs[0].paymentType === 'Transfer' && this.subscribers.subs[0].status === 'Pending') {
        return this.toastr.Info("Please wait for your subscription to be confirmed before adding items.");
      } else {
        if(this.purchases.length > 0 && this.purchases[0].status === 'Pending') {
          return this.toastr.Info("You cannot add items now as you have a pending order.");
        }
        let today = new Date();
        if(this.purchases.length > 0 && (!deliveryDateDate || today < deliveryDateDate)) {
          return this.toastr.Info("You can only add new items two weeks after current delivery.");
        }
      }
      let res = this.monthDiff(deliveryDateDate ? deliveryDateDate : new Date());
        if(res > 0) {
          res *= (this.subscribers.amount) * 5 / 100;
          this.interest = res;
        }
        else {
          this.interest = (this.subscribers.amount) * 5 / 100;
        }
      localStorage.setItem("subId", this.subscribers.subs[0].id);
      this.router.navigateByUrl("app/farmify-shopping", { state: { interest: this.interest} });
    } else {
      if(this.subscribers.subs.length > 0 ){
        if(this.subscribers.subs[0].paymentType === 'Transfer' && this.subscribers.subs[0].status === 'Pending') {
          return this.toastr.Info("Please wait for your subscription to be confirmed before adding items.");
        }
        let res = this.monthDiff(deliveryDateDate ? deliveryDateDate : new Date());
        if(res > 0) {
          res *= (this.subscribers.amount) * 5 / 100;
          this.interest = res;
        }
        else {
          this.interest = (this.subscribers.amount) * 5 / 100;
        }
        localStorage.setItem("subId", this.subscribers.subs[0].id);
        return this.router.navigateByUrl("app/farmify-shopping", { state: { interest: this.interest}});
      }
      return this.toastr.Info("Please subscribe first before adding items");
    }
  }


  }

  async chooseSubToBuyFrom() {
    let options = {};
    this.subscribers.subs.map(sb => {
      options[sb.id] = `${formatter.format(sb.amount)}`;
    })
    const { value } = await Swal.fire({
      title: 'Choose subscription',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Select a subscription to buy from',
      showCancelButton: true,
      confirmButtonColor: 'green',
      inputValidator: (value) => {
        if (!value) {
          return 'Please select one of the options above.'
        }
      }
    });

    if (value) {
      let deliveryDate;
      const item = this.subscribers.subs.find(x => x.id === value);
      if(item) {
        let y = this.purchases.filter((ft) => {
          return ft.SubscriberId === item.id
        })
        if(y.length > 1) {
          y = y.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b);
        }
        if(y.length > 0) {
          if(y[0].deliveredDate) {
            deliveryDate = new Date(y[0].deliveredDate);
            deliveryDate = new Date(deliveryDate.setDate(deliveryDate.getDate() + 2 * 7));
          }
          if(y[0].Subscriber.paymentType === 'Transfer' && y[0].Subscriber.status === 'Pending') {
            return this.toastr.Info("Please wait for this subscription to be confirmed before adding items.");
          } else {
            if(y[0].status === 'Pending') {
              return this.toastr.Info("You still have a pending order for this subscription.");
            }
            let today = new Date();
            if(!deliveryDate || today < deliveryDate) {
              return this.toastr.Info("You can only add new items two weeks after current delivery of this subscription.");
            }
          }
        }
        if(item.paymentType === 'Transfer' && item.status === 'Pending') {
          return this.toastr.Info("Please wait for this subscription to be confirmed before adding items.");
        }
        let res = this.monthDiff(deliveryDate ? deliveryDate : new Date());
        if(res > 0) {
          res *= (item.amount) * 5 / 100;
          this.interest = res;
        }
        else {
          this.interest = (item.amount) * 5 / 100;
        }
        localStorage.setItem("subId", item.id);
        return this.router.navigateByUrl("app/farmify-shopping", { state: { interest: this.interest} });
      }
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

  switchSubs(event) {
    if(event.target.value) {
      const item = this.subscribers.subs.find(x => x.id === event.target.value);
      if(item){
        this.subscribers.amount = item.amount;
        this.subscribers.roi = item.roi;
        this.subscribers.roc = item.roc;
      }
    }
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
