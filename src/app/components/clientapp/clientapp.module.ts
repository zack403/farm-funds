import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ClientappComponent } from './clientapp.component';
import { ClientappRoutingModule } from './clientapp-routing/clientapp-routing';
import { FarmifyShoppingComponent } from '../farmify-shopping/farmify-shopping.component';
import { ShoppingCartComponent } from '../products/shopping-cart/shopping-cart.component';
import { PackagesComponent } from '../packages/packages.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { FoodbankDashboardComponent } from './foodbank-dashboard/foodbank-dashboard.component';
import { InvestmentDashboardComponent } from './investment-dashboard/investment-dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {TimeAgoPipe} from 'time-ago-pipe';




@NgModule({
  imports: [
    CommonModule,
    ClientappRoutingModule,
    FormsModule,
    NgxPaginationModule

  ],
  declarations: [
    ClientappComponent, 
    HeaderComponent, 
    SideBarComponent, 
    FooterComponent, 
    FarmifyShoppingComponent,
    ShoppingCartComponent,
    PackagesComponent,
    DepositComponent,
    WithdrawalComponent,
    FoodbankDashboardComponent,
    InvestmentDashboardComponent,
    TimeAgoPipe,
    NotificationsComponent],
  exports: [ClientappComponent],
  
})
export class ClientappModule { }
