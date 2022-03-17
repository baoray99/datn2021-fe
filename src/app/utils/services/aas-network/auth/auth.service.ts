import { Injectable } from '@angular/core';
import { ServicePath } from '../../../common/constant-service-api';
import { API } from '../../api';
import { User } from '../../../models/user/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/utils/models/course/course.model';

const USER_LOGIN = ServicePath.AUTH_SERVICE + '/login';
const USER_REGISTER = ServicePath.AUTH_SERVICE + '/register';
const USER_UPDATE = ServicePath.AUTH_SERVICE;
const USER_COURSE_LIST = ServicePath.AUTH_SERVICE + '/my-courses';
const REGISTER_COURSE = ServicePath.AUTH_SERVICE + '/registered-course';
const TEACHING_COURSE = ServicePath.AUTH_SERVICE + '/teaching-course';
const USER_ADD_COURSE = ServicePath.AUTH_SERVICE;
const USER_BY_ROLE = ServicePath.AUTH_SERVICE;
const USER_DETAIL = ServicePath.AUTH_SERVICE;
const USER_ME = ServicePath.AUTH_SERVICE + '/me';
const USER_DELETE = ServicePath.AUTH_SERVICE;
const UNREGISTER_COURSE = ServicePath.AUTH_SERVICE + '/unregister-course';
const UNTEACHING_COURSE = ServicePath.AUTH_SERVICE + '/unteaching-course';
const ALL_COURSE_LOGINED = ServicePath.AUTH_SERVICE + '/all-course-logined';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: API) {}
  //GET user by role
  getUsersByRole() {
    const url = USER_BY_ROLE;
    return this.api.get(url);
  }

  //Login
  userLogin(data) {
    const url = USER_LOGIN;
    return this.api.post(url, data);
  }

  //Register
  userRegister(data) {
    const url = USER_REGISTER;
    return this.api.post(url, data);
  }

  //get me
  getMe() {
    const url = USER_ME;
    return this.api.get(url);
  }

  //update User
  userUpdate(id: string, data) {
    const url = USER_UPDATE + `/${id}`;
    return this.api.put(url, data);
  }

  //delete user
  deleteUser(id: string) {
    const url = USER_DELETE + `/${id}`;
    return this.api.delete(url);
  }

  //get user's registed coures
  getRegisteredCourses() {
    const url = REGISTER_COURSE;
    return this.api.get(url);
  }
  //get teaching course
  getTeachingCourse() {
    const url = TEACHING_COURSE;
    return this.api.get(url);
  }

  //add to my registered courses
  addRegisteredCourse(data) {
    const url = USER_ADD_COURSE;
    return this.api.put(url, data);
  }

  //GEt popular unregister course
  getPopularCourseWithLogin(registerdCourse: any) {
    const url = UNREGISTER_COURSE;
    return this.api.post(url, registerdCourse);
  }
  getAllCourseWithLogin(registerdCourse: any) {
    const url = ALL_COURSE_LOGINED;
    return this.api.post(url, registerdCourse);
  }
}
