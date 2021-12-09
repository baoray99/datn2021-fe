import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserLearnComponent } from './layouts/user-learn/user-learn.component';
import { UserLoginComponent } from './layouts/user-login/user-login.component';
import { UserComponent } from './layouts/user/user.component';
import { CourseManagerPageComponent } from './service-pages/service-enduser/course-manager-page/course-manager-page.component';
import { LessionManagerPageComponent } from './service-pages/service-enduser/lession-manager-page/lession-manager-page.component';
import { HomePageComponent } from './service-pages/service-enduser/home-page/home-page.component';
import { LearnPageComponent } from './service-pages/service-enduser/learn-page/learn-page.component';
import { CoursePageComponent } from './service-pages/service-enduser/course-page/course-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'my-courses', component: CourseManagerPageComponent },
      { path: 'my-course', component: LessionManagerPageComponent },
      { path: 'courses', component: CoursePageComponent },
    ],
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'learn',
    component: UserLearnComponent,
    children: [{ path: 'html-css', component: LearnPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
