import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { TopSectionComponent } from './components/header/top-section/top-section/top-section.component';
import { LogoSectionComponent } from './components/header/logo-section/logo-section/logo-section.component';
import { NavigationSectionComponent } from './components/header/navigation-section/navigation-section/navigation-section.component';
import { FaqsComponent } from './components/faqs/faqs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactUsComponent,
    ProductsComponent,
    TeamComponent,
    TestimonialsComponent,
    ProgramsComponent,
    TopSectionComponent,
    LogoSectionComponent,
    NavigationSectionComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
