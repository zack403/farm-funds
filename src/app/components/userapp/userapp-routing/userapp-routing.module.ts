import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserappComponent } from '../userapp.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from '../../products/shopping-cart/shopping-cart.component';
import { FarmifyShoppingComponent } from '../../farmify-shopping/farmify-shopping.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileDataService } from 'src/app/resolvers/profile-data.service';
import { FarmifyShoppingDetailComponent } from '../../farmify-shopping-detail/farmify-shopping-detail.component';

const userAppRouter: Routes = [
  {
    path: 'app',
    component: UserappComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
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
        path: 'farmify-shopping-detail',
        component: FarmifyShoppingDetailComponent,
      }
    ]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(userAppRouter),
    CommonModule
  ],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class UserappRoutingModule { }
