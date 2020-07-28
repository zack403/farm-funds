import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

declare var jQuery;
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() shouldShow : boolean = true;
  foodList: Array<any>;
  searchValue = "";
  clonedfoodList : Array<any>;
  nomatch: boolean = false;
  constructor(private router: Router, private prodSvc: ProductsService) { }

  ngOnInit() {
    this.foodList = this.prodSvc.getFoodList();
    this.clonedfoodList = [...this.foodList];
  }

  goToDetail(id) {
    this.router.navigate(["/food-shop-detail", {id: JSON.stringify(id), sub: false}]);
  }

  search(value) {      
    this.foodList = this.foodList.filter(x => x.foodName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    if(this.foodList.length === 0) {
      this.nomatch = true;
    }
  }

  onChange(value){
    if(!this.searchValue){
      this.nomatch = false;
      this.foodList = this.clonedfoodList;
      this.foodList = this.foodList.filter(x => x.foodName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
  }

}
