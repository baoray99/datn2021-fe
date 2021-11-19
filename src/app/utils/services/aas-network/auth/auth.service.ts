import { Injectable } from '@angular/core';
import { ServicePath } from '../../../common/constant-service-api';
import { API } from '../../api';

const USER_LOGIN = ServicePath.AUTH_SERVICE + '/login';
const USER_REGISTER = ServicePath.AUTH_SERVICE + '/register';
const USER_UPDATE = ServicePath.AUTH_SERVICE;
const USER_COURSE_LIST = ServicePath.AUTH_SERVICE + '/my-courses';
const USER_ADD_COURSE = ServicePath.AUTH_SERVICE;
const USER_BY_ROLE = ServicePath.AUTH_SERVICE;
const USER_DETAIL = ServicePath.AUTH_SERVICE;
const USER_DELETE = ServicePath.AUTH_SERVICE;

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
  getMe(id: string) {
    const url = USER_DETAIL + `/${id}`;
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
    const url = USER_COURSE_LIST;
    return this.api.get(url);
  }

  //add to my registered courses
  addRegisteredCourse(data) {
    const url = USER_ADD_COURSE;
    return this.api.post(url, data);
  }
}
