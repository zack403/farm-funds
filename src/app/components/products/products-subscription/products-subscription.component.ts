import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-subscription',
  templateUrl: './products-subscription.component.html',
  styleUrls: ['./products-subscription.component.css']
})
export class ProductsSubscriptionComponent implements OnInit {
  foodSubs: Array<any>;
  searchValue = "";
  nomatch: boolean = false;
  clonedFoodSubs: Array<any>;
  constructor(private prodSvc: ProductsService, private router : Router, private authSvc: AuthService) { }

  ngOnInit() {
    this.foodSubs = this.prodSvc.getFoodList();
    this.clonedFoodSubs = this.foodSubs;
  }

  subscribeToAPackage(id) {
    if(this.authSvc.isLoggedIn()){
      this.router.navigate(["/food-shop-detail", {id: JSON.stringify(id), sub: true}]);
    }
    else {
      this.router.navigateByUrl("login");
    }
  }

  search(value) {      
    this.foodSubs = this.foodSubs.filter(x => x.foodName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    if(this.foodSubs.length === 0) {
      this.nomatch = true;
    }
  }

  onChange(value){
    if(!this.searchValue){
      this.nomatch = false;
      this.foodSubs = this.clonedFoodSubs;
      this.foodSubs = this.foodSubs.filter(x => x.foodName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
  }
}
