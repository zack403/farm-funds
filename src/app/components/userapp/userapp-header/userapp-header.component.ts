import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


let totalCartPrice = 0;
const formatter = new Intl.NumberFormat('en-NI', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
})

@Component({
  selector: 'app-userapp-header',
  templateUrl: './userapp-header.component.html',
  styleUrls: ['./userapp-header.component.css']
})
export class UserappHeaderComponent implements OnInit {
  userData: User;
  cart: any = {
    purchaseDetails: []
  };
  itemsInCart: any = {};
  subscription: Subscription;
  basketTotal: number = 0;
  interest: any;

  constructor(
    private authSvc: AuthService, 
    public router: Router, 
    private messageService: MessageService,
    private toastr: ToasterService) { 
      // subscribe to home component messages
      this.subscription = this.messageService.onMessage().subscribe(({data, deleted}) => {
        if (data && !deleted) {
            this.interest = data.interest;
            //check if item is already in cart before pushing
            const isExist = this.cart.purchaseDetails.find(x => x.productId === data.id);
            if(isExist) return this.toastr.Info("Product already in the basket.");
            totalCartPrice += data.price * data.unit;
            
            

            // check if basket total is greater than user purchase power
            if(totalCartPrice > data.interest) {
              totalCartPrice -= data.price * data.unit;
              // return this.toastr.Info(`Sorry we are unable to add to the basket, because adding ${formatter.format(data.price * data.unit)} to ${formatter.format(this.basketTotal)} exceeds your purchase power of ${formatter.format(data.interest)}`);
              return this.toastr.Info(`Sorry you have reach the limit of your purchase power of ${formatter.format(data.interest)}`);
            }
            this.basketTotal = totalCartPrice;
            this.cart.name = this.userData.fullName;
            this.cart.email = this.userData.email;
            this.cart.UserId = this.userData.id;
            this.cart.type = "subscription";
            this.cart.phoneNo = this.userData.phoneNo;
            this.cart.SubscriberId = data.SubscriberId;
            this.cart.interest = data.interest;
            this.cart.basketTotal = this.basketTotal;
            this.itemsInCart.productName = data.productName;
            this.itemsInCart.productId = data.id;
            this.itemsInCart.price = data.price * data.unit;
            this.itemsInCart.brand = data.brand ? data.brand : '';
            this.itemsInCart.unit = data.unit;
            this.cart.purchaseDetails.push(this.itemsInCart);
            localStorage.setItem("cart", JSON.stringify(this.cart));
            this.itemsInCart = {};
        } else if(data && deleted) {
            this.basketTotal -= data.price;
            totalCartPrice -= data.price;
            this.cart.purchaseDetails = this.cart.purchaseDetails.filter((doc) => {
              return doc.productId != data.productId;
            });
        } 
        else {
            // clear messages when empty message received
            this.basketTotal = 0;
            totalCartPrice = 0;
            this.cart = {
              purchaseDetails: []
            };
        }
    });
  }
 
  ngOnInit(): void {
    this.userData = this.authSvc.getCurrentUserData();
    const result = JSON.parse(localStorage.getItem("cart"));
    if(result) {
      this.cart = result;
      for(const p of this.cart.purchaseDetails){
        this.basketTotal += p.price;
      }
      totalCartPrice = this.basketTotal;
    } 
    const int = parseInt(localStorage.getItem("interest"));
    if(int){
      this.interest = int;
    }
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      closeOnConfirm: true,
      closeOnCancel: true
    }).then((result) => {
      if(result.value) {
        this.authSvc.logout();
      }
    })
  }

  go() {
    this.router.navigateByUrl("app/profile")
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  viewCart() {
      this.router.navigateByUrl("app/shopping-cart");
  }

}
