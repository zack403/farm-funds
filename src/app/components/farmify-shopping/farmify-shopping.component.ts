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
  interest: number = 0;
  constructor(private prodSvc: ProductsService, private toastr: ToasterService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("state", history.state);
    this.getProducts();
    if(history.state.interest){
      this.interest = history.state.interest;
      localStorage.setItem("interest", `${this.interest}`);
    }else {
      const int = parseInt(localStorage.getItem("interest"));
      if(int){
        this.interest = int;
      }
    }
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

  addToCart(item) {
    if(!item.price){
      return;
    }
    if(!item.unit || item.unit <= 0){
      return this.toastr.Error(`Please input quantity greater than 0 for ${item.productName}`)
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

  changed() {
    console.log("changed");
    // let qty = parseInt((<HTMLInputElement> document.getElementById('qty')).value);
    // if(qty) {
    //   let price = parseInt((<HTMLInputElement> document.getElementById('price')).value);
    //   let val = (<HTMLInputElement> document.getElementById('price'));
    //   val.innerHTML = qty  * price;
    // }
  }

  addMoreProdct() {
    Swal.fire({
      title: 'Add product',
      html:
      '<input required placeholder="Enter product name" type="text" id="product" class="swal2-input" autofocus >' +
      '<input required placeholder="Enter price" type="text" id="price" class="swal2-input">' +
      '<input  required placeholder="Enter quantity" type="number" id="qty" class="swal2-input">' +
      '<input placeholder="Enter brand" id="brand" type="text" class="swal2-input">',
      onOpen: () => {
        let unit = (<HTMLInputElement> document.getElementById('qty'));
        let price = (<HTMLInputElement> document.getElementById('price'));

        unit.oninput = () => {
          const result: any = Number(price.value) * Number(unit.value);
          document.getElementById('price').innerHTML = result;
          console.log(result);
        }
      },
      showCloseButton: true,
      confirmButtonText: 'Add to basket',
      confirmButtonColor: 'green',
      preConfirm: () => {
        let productName = (<HTMLInputElement> document.getElementById('product')).value;
        let price = (<HTMLInputElement> document.getElementById('price')).value;
        let unit = (<HTMLInputElement> document.getElementById('qty')).value;
        let brand = (<HTMLInputElement> document.getElementById('brand')).value;

        if(productName === '' || price === '' || unit === '') {
          Swal.showValidationMessage("Product/Price/Unit is required"); // Show error when validation fails.
        } else if (!price.match(/^[0-9]*$/)) {
          Swal.showValidationMessage("Your input for price is not valid"); // Show error when validation fails.
        } else if(parseInt(unit) < 1) {
          Swal.showValidationMessage("Please input quantity greater than zero"); // Show error when validation fails.
        }
        
          return {
            id: new Date(),
            productName,
            price,
            unit,
            brand
          }
      }

    }).then( result => {
      if(result.value) {
        this.addToCart(result.value);
      }
    })
  }

}
