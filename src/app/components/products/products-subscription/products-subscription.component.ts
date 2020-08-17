import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

declare var PaystackPop: any;


@Component({
  selector: 'app-products-subscription',
  templateUrl: './products-subscription.component.html',
  styleUrls: ['./products-subscription.component.css']
})
export class ProductsSubscriptionComponent implements OnInit {
  unit: boolean = false;
  proceed: boolean  = false;
  susbcribe : boolean  = false;
  msg: boolean = false;
  message: string;

  constructor(private authSvc: AuthService, private toastr: ToasterService, private router : Router) { }

  ngOnInit() {
    this.unit = true;
    this.susbcribe = true;
  }


  deposit(amt) {
   amt *= 100000;
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
                that.unit = false;
                that.susbcribe = false;
                that.msg = true;
                that.proceed = true;
                that.message = `Your payment is successful, your transaction reference is ${response.reference}. Click proceed to select items worth your interest`
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

}
