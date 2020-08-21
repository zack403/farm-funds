import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartData: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe( params => {
      if (this.router.getCurrentNavigation().extras.state.invoice) {
        const {cartItems} = this.router.getCurrentNavigation().extras.state;
        if(cartItems){
           this.cartData = cartItems;
        }
      }
    });
  }
  

  ngOnInit() {
  }

}
