import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

declare var jQuery;
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  foodList: Array<any>;
  searchValue = ""
  constructor(private router: Router, private prodSvc: ProductsService) { }

  ngOnInit() {
    this.foodList = this.prodSvc.getFoodList();
  }

  goToDetail(id) {
    this.router.navigate(["/food-shop-detail", {id: JSON.stringify(id)}]);
  }

  search(value) {
    if(value === "")
      
    this.foodList = this.foodList.filter(x => x.foodName.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

}
