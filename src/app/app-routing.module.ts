import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/products/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/products/checkout/checkout.component';
import { NewsComponent } from './components/news/news.component';
import { ProductsSubscriptionComponent } from './components/products/products-subscription/products-subscription.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { GalleryGridViewComponent } from './components/gallery/gallery-grid-view/gallery-grid-view.component';
import { ServicesComponent } from './components/services/services.component';
import { TermsComponent } from './components/terms/terms.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PackagesComponent } from './components/packages/packages.component';
import { TeamComponent } from './components/team/team.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'testimonials', component: TestimonialsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'food-shop', component: ProductsListComponent},
  {path: 'food-subscription', canActivate: [AuthGuard], component: ProductsSubscriptionComponent},
  {path: 'food-shop-detail', component: ProductDetailComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'news', component: NewsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'gallery', component: GalleryGridViewComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'packages', canActivate: [AuthGuard], component: PackagesComponent},
  {path: 'team', component: TeamComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'profile', canActivate: [AuthGuard], component: UserProfileComponent},
  {path: '**', redirectTo: ''},
  {path: '', redirectTo:'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
