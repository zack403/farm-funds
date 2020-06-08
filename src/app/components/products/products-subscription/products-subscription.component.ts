import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

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
  constructor(private prodSvc: ProductsService, private router : Router) { }

  ngOnInit() {
    this.foodSubs = this.prodSvc.getFoodList();
    this.clonedFoodSubs = this.foodSubs;
  }

  goToDetail(id) {
    this.router.navigate(["/food-shop-detail", {id: JSON.stringify(id), sub: true}]);
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
