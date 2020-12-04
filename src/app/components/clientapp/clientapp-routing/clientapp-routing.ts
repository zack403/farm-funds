import { WithdrawalComponent } from './../withdrawal/withdrawal.component';
import { DepositComponent } from './../deposit/deposit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from '../../products/shopping-cart/shopping-cart.component';
import { FarmifyShoppingComponent } from '../../farmify-shopping/farmify-shopping.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileDataService } from 'src/app/resolvers/profile-data.service';
import { FarmifyShoppingDetailComponent } from '../../farmify-shopping-detail/farmify-shopping-detail.component';
import { PackagesComponent } from '../../packages/packages.component';
import { ClientappComponent } from '../clientapp.component';
import { FoodbankDashboardComponent } from '../foodbank-dashboard/foodbank-dashboard.component';
import { InvestmentDashboardComponent } from '../investment-dashboard/investment-dashboard.component';

const clientAppRouter: Routes = [
  {
    path: 'app',
    component: ClientappComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        runGuardsAndResolvers: 'always',
        resolve: {user: ProfileDataService}
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
        path: 'farmify-shopping-detail/:id',
        component: FarmifyShoppingDetailComponent,
      },
      {
        path: 'packages',
        component: PackagesComponent,
      },
      {
        path: 'foodbank-dashboard',
        component: FoodbankDashboardComponent,
        runGuardsAndResolvers: 'always',
        resolve: {user: ProfileDataService}
      },
      {
        path: 'investment-dashboard',
        component: InvestmentDashboardComponent,
        runGuardsAndResolvers: 'always',
        resolve: {user: ProfileDataService}
      },
      {
        path: 'deposit',
        component: DepositComponent,
        runGuardsAndResolvers: 'always',
        resolve: {user: ProfileDataService}
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        runGuardsAndResolvers: 'always',
        resolve: {user: ProfileDataService}
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
