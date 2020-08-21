import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/services/products.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-farmify-shopping',
  templateUrl: './farmify-shopping.component.html',
  styleUrls: ['./farmify-shopping.component.css']
})
export class FarmifyShoppingComponent implements OnInit {
  apiUrl = environment.imagePath;
  page: number = 1;
  size: number = 15;
  search: string = "";
  products: Array<any> = [];
  constructor(private prodSvc: ProductsService, private toastr: ToasterService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProducts();
  }
    goToDetail(id) {
      this.router.navigate(["app/farmify-shopping-detail", {id: JSON.stringify(id), sub: false}]);
    }

    getProducts(){
      this.prodSvc.GetProducts(this.page, this.size, this.search).subscribe((res: any) => {
      this.products = res;
      if(res.data.length === 0) return this.toastr.Info("No record found");  
      }, err => {
        console.log(err);
      })
  }

  onChange(item) {
    this.search = item;
    this.getProducts();
  }

  handlePageChange(event) {
    this.page = event;
    this.getProducts();
  }

  addToCart(item, index) {
    item.brand = item[index]
    // send message to subscribers via observable subject
    this.messageService.sendMessage(item);
  }

  clearCart(): void {
    // clear messages
    this.messageService.clearMessages();
  }

}
