import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientappComponent } from './clientapp.component';
import { ClientappRoutingModule } from './clientapp-routing/clientapp-routing';
import { FarmifyShoppingComponent } from '../farmify-shopping/farmify-shopping.component';
import { ShoppingCartComponent } from '../products/shopping-cart/shopping-cart.component';
import { FarmifyShoppingDetailComponent } from '../farmify-shopping-detail/farmify-shopping-detail.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { PackagesComponent } from '../packages/packages.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    ClientappRoutingModule,
    FormsModule

  ],
  declarations: [ClientappComponent, HeaderComponent, SideBarComponent, FooterComponent, DashboardComponent, UserProfileComponent,
    FarmifyShoppingComponent,
    ShoppingCartComponent,
    FarmifyShoppingDetailComponent,
    PackagesComponent],
  exports: [ClientappComponent],
  
})
export class ClientappModule { }
