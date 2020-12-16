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
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { GalleryGridViewComponent } from './components/gallery/gallery-grid-view/gallery-grid-view.component';
import { NewsComponent } from './components/news/news.component';
import { ProductsSubscriptionComponent } from './components/products/products-subscription/products-subscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesComponent } from './components/services/services.component';
import { TermsComponent } from './components/terms/terms.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from './services/toaster.service';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChanges } from './guards/prevent-unsafe-changes';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ResponseresetComponent } from './components/auth/responsereset/responsereset.component';
import { FarmifyCityComponent } from './components/farmify-city/farmify-city.component';
import { ClientappModule } from './components/clientapp/clientapp.module';




export function tokenGetter() {
  return localStorage.getItem("token");
}

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
    LoginComponent,
    SignupComponent,
    GalleryGridViewComponent,
    NewsComponent,
    ProductsSubscriptionComponent,
    ServicesComponent,
    TermsComponent,
    ResetPasswordComponent,
    ResponseresetComponent,
    FarmifyCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //UserappModule,
    ClientappModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //allowedDomains: ['farmfunds.herokuapp.com'],
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    ToasterService,
    AuthGuard,
    PreventUnsavedChanges,
    LoginComponent,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
