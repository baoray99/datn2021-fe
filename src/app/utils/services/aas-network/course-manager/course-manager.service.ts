import { Injectable } from '@angular/core';
import { ServicePath } from '../../../common/constant-service-api';
import { API } from '../../api';

const COURSE_LIST = ServicePath.COURSE_SERVICE;
const COURSE_BY_SLUG = ServicePath.COURSE_SERVICE;
const COURSE_ADD = ServicePath.COURSE_SERVICE;
const COURSE_UPDATE = ServicePath.COURSE_SERVICE;
const COURSE_DELETE = ServicePath.COURSE_SERVICE;

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

  //GET course by slug
  getCourseBySlug(slug: string) {
    const url = COURSE_BY_SLUG + `/${slug}`;
    return this.api.get(url);
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
