import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserappComponent } from './userapp.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserappRoutingModule } from './userapp-routing/userapp-routing.module';
import { UserappHeaderComponent } from './userapp-header/userapp-header.component';
import { FormsModule } from '@angular/forms';
import { FarmifyShoppingComponent } from '../farmify-shopping/farmify-shopping.component';
import { ShoppingCartComponent } from '../products/shopping-cart/shopping-cart.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FarmifyShoppingDetailComponent } from '../farmify-shopping-detail/farmify-shopping-detail.component';
import { PackagesComponent } from '../packages/packages.component';




@NgModule({
  imports: [
    CommonModule,
    UserappRoutingModule,
    FormsModule,
    NgxPaginationModule
    
  ],
  declarations: [
      UserappComponent,
      UserappHeaderComponent,
      UserProfileComponent,
      FarmifyShoppingComponent,
      ShoppingCartComponent,
      FarmifyShoppingDetailComponent,
      PackagesComponent

  ],
  exports: [UserappComponent]
})
export class UserappModule { }
