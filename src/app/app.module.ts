import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './utils/interceptors/loading.interceptor';

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

//import service
import { API } from './utils/services/api';
import { HomePageComponent } from './service-pages/service-enduser/home-page/home-page.component';
import { HaspermissionDirective } from './utils/directives/haspermission.directive';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

//Ant design
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

//Owl carousel
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CourseManagerPageComponent } from './service-pages/service-enduser/course-manager-page/course-manager-page.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { LessonManagerPageComponent } from './service-pages/service-enduser/lesson-manager-page/lesson-manager-page.component';
import { CoursePageComponent } from './service-pages/service-enduser/course-page/course-page.component';
import { SpinnerComponent } from './layouts/extensions/spinner/spinner.component';
import { LessonPageComponent } from './service-pages/service-enduser/lesson-page/lesson-page.component';
import { EditMePageComponent } from './service-pages/service-enduser/edit-me-page/edit-me-page.component';
registerLocaleData(en);

//Socket io
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = {
//   url: 'http://localhost:3000',
//   options: { transports: ['websocket'] },
// };

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
    HomePageComponent,
    CourseManagerPageComponent,
    LessonManagerPageComponent,
    HaspermissionDirective,
    CoursePageComponent,
    SpinnerComponent,
    LessonPageComponent,
    EditMePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    IconsProviderModule,
    CarouselModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    NzPopconfirmModule,
    NzModalModule,
    NzMessageModule,
    // SocketIoModule.forRoot(config),
  ],
  providers: [
    API,
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
