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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'testimonials', component: TestimonialsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'products-list', component: ProductsListComponent},
  {path: 'product-detail', component: ProductDetailComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
