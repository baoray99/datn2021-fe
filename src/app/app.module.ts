import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './layouts/user/user.component';
import { HeaderComponent } from './layouts/user/header/header.component';
import { FooterComponent } from './layouts/user/footer/footer.component';
import { SidebarComponent } from './layouts/user/sidebar/sidebar.component';
import { UserLoginComponent } from './layouts/user-login/user-login.component';
import { LearnPageComponent } from './service-pages/service-enduser/learn-page/learn-page.component';
import { UserLearnComponent } from './layouts/user-learn/user-learn.component';
import { UserLearnHeaderComponent } from './layouts/user-learn/user-learn-header/user-learn-header.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AdminHeaderComponent } from './layouts/admin/admin-header/admin-header.component';

//import service
import { API } from './utils/services/api';
import { HomePageComponent } from './service-pages/service-enduser/home-page/home-page.component';
import { HaspermissionDirective } from './utils/directives/haspermission.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UserLoginComponent,
    LearnPageComponent,
    UserLearnComponent,
    UserLearnHeaderComponent,
    AdminComponent,
    AdminHeaderComponent,
    HomePageComponent,
    HaspermissionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [API],
  bootstrap: [AppComponent],
})
export class AppModule {}
