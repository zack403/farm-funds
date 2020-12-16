import { WithdrawalComponent } from './../withdrawal/withdrawal.component';
import { DepositComponent } from './../deposit/deposit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from '../../products/shopping-cart/shopping-cart.component';
import { FarmifyShoppingComponent } from '../../farmify-shopping/farmify-shopping.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileDataService } from 'src/app/resolvers/profile-data.service';
import { PackagesComponent } from '../../packages/packages.component';
import { ClientappComponent } from '../clientapp.component';
import { FoodbankDashboardComponent } from '../foodbank-dashboard/foodbank-dashboard.component';
import { InvestmentDashboardComponent } from '../investment-dashboard/investment-dashboard.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { InvestmentDataResolver } from 'src/app/resolvers/investment-data.resolver';

const clientAppRouter: Routes = [
  {
    path: 'app',
    component: ClientappComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'foodbank-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'farmify-shopping',
        component: FarmifyShoppingComponent,
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
      },
      {
        path: 'packages',
        component: PackagesComponent,
      },
      {
        path: 'foodbank-dashboard',
        component: FoodbankDashboardComponent,
        runGuardsAndResolvers: 'always',
        resolve: {fooddashdata: ProfileDataService}
      },
      {
        path: 'investment-dashboard',
        component: InvestmentDashboardComponent,
        runGuardsAndResolvers: 'always',
        resolve: {foodinvdata:  InvestmentDataResolver}
      },
      {
        path: 'deposit',
        component: DepositComponent
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      }
    ]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(clientAppRouter),
    CommonModule
  ],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class ClientappRoutingModule { }
