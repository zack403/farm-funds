import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { TopSectionComponent } from './components/header/top-section/top-section/top-section.component';
import { LogoSectionComponent } from './components/header/logo-section/logo-section/logo-section.component';
import { NavigationSectionComponent } from './components/header/navigation-section/navigation-section/navigation-section.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/products/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/products/checkout/checkout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { GalleryGridViewComponent } from './components/gallery/gallery-grid-view/gallery-grid-view.component';
import { NewsComponent } from './components/news/news.component';
import { ProductsSubscriptionComponent } from './components/products/products-subscription/products-subscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesComponent } from './components/services/services.component';
import { TermsComponent } from './components/terms/terms.component';
import { PackagesComponent } from './components/packages/packages.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { FieldErrorDisplayComponent } from './components/auth/field-error-display/field-error-display.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactUsComponent,
    TeamComponent,
    TestimonialsComponent,
    ProgramsComponent,
    TopSectionComponent,
    LogoSectionComponent,
    NavigationSectionComponent,
    FaqsComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    GalleryGridViewComponent,
    NewsComponent,
    ProductsSubscriptionComponent,
    ServicesComponent,
    TermsComponent,
    PackagesComponent,
    ResetPasswordComponent,
    FieldErrorDisplayComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
