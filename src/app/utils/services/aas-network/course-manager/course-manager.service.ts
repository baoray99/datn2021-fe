import { Injectable } from '@angular/core';
import { ServicePath } from '../../../common/constant-service-api';
import { API } from '../../api';

const COURSE_LIST = ServicePath.COURSE_SERVICE;
const POPULAR_COURSE = ServicePath.COURSE_SERVICE + '/popular';
const REGISTERED_COURSE = ServicePath.COURSE_SERVICE;
const COURSE_BY_SLUG = ServicePath.COURSE_SERVICE;
const COURSE_BY_TEACHER = ServicePath.COURSE_SERVICE;
const COURSE_BY_ID = ServicePath.COURSE_SERVICE + '/id';
const COURSE_ADD = ServicePath.COURSE_SERVICE;
const COURSE_UPDATE = ServicePath.COURSE_SERVICE;
const COURSE_DELETE = ServicePath.COURSE_SERVICE;
const RELATE_COURSES = ServicePath.COURSE_SERVICE + '/recommend';

@Injectable({
  providedIn: 'root',
})
export class CourseManagerService {
  constructor(private api: API) {}

  //GET all courses
  getAllCourses() {
    const url = COURSE_LIST;
    return this.api.get(url);
  }
  //GET popular courses
  getPopularCourse() {
    const url = POPULAR_COURSE;
    return this.api.get(url);
  }
  //GET course by Id
  getCourseById(id: string) {
    const url = COURSE_BY_ID + `/${id}`;
    return this.api.get(url);
  }
  //GET course by slug
  getCourseBySlug(slug: string) {
    const url = COURSE_BY_SLUG + `/${slug}`;
    return this.api.get(url);
  }
  //GET registered course
  // getRegisteredCourse(){
  //   const
  // }
  getCourseByTeacherId(id: string) {
    const url = COURSE_BY_TEACHER + `/teacher/${id}`;
    return this.api.get(url);
  }
  getRelateCourses(data) {
    const url = RELATE_COURSES;
    return this.api.post(url, data);
  }
  //POST course
  createCourse(data) {
    const url = COURSE_ADD;
    return this.api.post(url, data);
  }

  //PUT course
  updateCourse(id: string, data) {
    const url = COURSE_UPDATE + `/${id}`;
    return this.api.put(url, data);
  }

  //DELETE course
  deleteCourse(id: string) {
    const url = COURSE_DELETE + `/${id}`;
    return this.api.delete(url);
  }
}
