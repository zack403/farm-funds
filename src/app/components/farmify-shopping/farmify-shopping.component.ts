import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/services/products.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';




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
  products: any;
  interest: number = 15000;
  constructor(private prodSvc: ProductsService, private toastr: ToasterService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("state", history.state);
    this.getProducts();
    if(history.state.interest){
      this.interest = history.state.interest;
    }
  }

    getProducts(){
      this.prodSvc.GetProducts(this.page, this.size, this.search).subscribe((res: any) => {
      this.products = res;
      for(const p of this.products.data){
        p.unit = 1;
      }
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

  addToCart(item) {
    if(!item.price){
      return;
    }
    item.interest = this.interest;
    item.price = parseInt(item.price);
    // send message to subscribers via observable subject
    this.messageService.sendMessage(item);
  }
  
  enterPrice(index){
    Swal.fire({
      input: 'text',
      inputPlaceholder: 'Price',
      confirmButtonColor: 'green',
      confirmButtonText: "Done",
      inputValidator: (value) => {
        if (!value || !value.match(/^[0-9]*$/)) {
          return 'Your input is not valid!'
        }
      }
    }).then( result => {
      if(result.value) {
        this.products.data[index].price = result.value;
      }
    })
    
  }

  clearCart(): void {
    // clear messages
    this.messageService.clearMessages();
  }

}
