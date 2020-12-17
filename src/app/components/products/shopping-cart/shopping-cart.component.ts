import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { ToasterService } from 'src/app/services/toaster.service';


const formatter = new Intl.NumberFormat('en-NI', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
})

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: any = {
    purchaseDetails: []
  };
  apiUrl = environment.imagePath;
  totalAmount: Array<any> = [];
  totalQty: Array<any> = [];
  orderTotalAmount: any;
  orderTotalQty: any;
  isBusy: boolean = false;
  constructor(
    private messageService: MessageService, 
    private router: Router, 
    private utilSvc: UtilityService,
    private toastr: ToasterService) { }

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem("cart"));
    if(result){
      this.cart = result;
      for (const {price} of this.cart.purchaseDetails) {
        this.totalAmount.push(price);
      }
      this.orderTotalAmount = this.totalAmount.reduce(this.sumTotal); 
    }
  }

  deleteItem(item, index) {
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
            let itemInStorage: any = JSON.parse(localStorage.getItem('cart'));
            let itemToRemove = itemInStorage.purchaseDetails[index];
            this.orderTotalAmount += - itemToRemove.price;
            itemInStorage.purchaseDetails.splice([index], 1);
            this.cart.purchaseDetails.splice([index], 1);          
            localStorage.setItem("cart", JSON.stringify(itemInStorage));
            this.messageService.clearMessage(item, true);
      }
    })
  }
  
  sumTotal(total, num) {
    return total + num;
  }

  clearBasket() {
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
        localStorage.removeItem("cart");
        this.messageService.clearMessages();
        this.router.navigateByUrl("app/farmify-shopping");
      }
    })
    
  }

  saveItems() {
    if(this.cart.interest && this.orderTotalAmount < this.cart.interest) {
      this.toastr.Info(`Please use up your purchase power of ${formatter.format(this.cart.interest)} before proceeding.`);

      setTimeout(() => {
        this.router.navigateByUrl('app/farmify-shopping');
      }, 10000);

      return;
    } 
    if(!this.cart.address) return this.toastr.Error("Shipping address is required.");
    this.cart.SubscriberId = localStorage.getItem("subId");
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your order will be sent for processing!',
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
        this.isBusy = true;
        this.cart.cartTotal = this.orderTotalAmount;
        this.utilSvc.saveItems(this.cart).subscribe((res: any) => {
          this.isBusy = false;
          this.toastr.Success(res.message);
          localStorage.removeItem("interest");
          localStorage.removeItem("cart");
          this.messageService.clearMessages();
          this.router.navigateByUrl("app/foodbank-dashboard");
        }, err => {
          this.isBusy = false;
        })
      }
    })
  }

}
