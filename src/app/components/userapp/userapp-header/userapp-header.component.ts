import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-userapp-header',
  templateUrl: './userapp-header.component.html',
  styleUrls: ['./userapp-header.component.css']
})
export class UserappHeaderComponent implements OnInit {
  userData: User;
  cart: any[] = [];
  subscription: Subscription;

  constructor(
    private authSvc: AuthService, 
    private router: Router, 
    private messageService: MessageService,
    private toastr: ToasterService) { 
      // subscribe to home component messages
      this.subscription = this.messageService.onMessage().subscribe(({data}) => {
        if (data) {
            //check if item is already in cart before pushing
            const isExist = this.cart.find(x => x.id === data.id);
            if(isExist) return this.toastr.Info("Product already in the cart.");
            this.cart.push(data);
            localStorage.setItem("cart", JSON.stringify(data));
        } else {
            // clear messages when empty message received
            this.cart = [];
        }
    });
  }
 
  ngOnInit(): void {
    this.userData = this.authSvc.getCurrentUserData();
    // const result = localStorage.getItem("cart");
    // if(result) {
    //   this.cart = JSON.parse(result);
    // } 
  }

  logout() {
    this.authSvc.logout();
  }

  go() {
    this.router.navigateByUrl("app/profile")
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  viewCart() {
    
  }

}
