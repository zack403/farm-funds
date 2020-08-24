import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-farmify-shopping-detail',
  templateUrl: './farmify-shopping-detail.component.html',
  styleUrls: ['./farmify-shopping-detail.component.css']
})
export class FarmifyShoppingDetailComponent implements OnInit {
  product: any;
  apiUrl = environment.imagePath;
  constructor(private prodSvc: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.prodSvc.GetById(this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
      this.product = res.data;
      if(this.product.imageUrl.includes("http")) {
        return;
      }else {
        this.product.imageUrl =`${this.apiUrl}/${this.product.imageUrl}`;
      }
      console.log(this.product);
    })
  }

}
