import { Injectable } from '@angular/core';
import { API } from '../../api';
import { ServicePath } from '../../../common/constant-service-api';
import { Lesson } from 'src/app/utils/models/lesson/lesson.model';

const LESSON_BY_COURSEID = ServicePath.LESSON_SERVICE + '?courseId=';
const CREATE_LESSON = ServicePath.LESSON_SERVICE;
const LESSON_BY_ID = ServicePath.LESSON_SERVICE;
const UPDATE_LESSON = ServicePath.LESSON_SERVICE;
const DELETE_LESSON = ServicePath.LESSON_SERVICE;
@Injectable({
  providedIn: 'root',
})
export class LessonManagerService {
  constructor(private api: API) {}
  getLessonByCourseId(courseId: string) {
    const url = LESSON_BY_COURSEID + `${courseId}`;
    return this.api.get(url);
  }

  getLessonById(id: string) {
    const url = LESSON_BY_ID + `/${id}`;
    return this.api.get(url);
  }
  createLesson(data: any) {
    const url = CREATE_LESSON;
    return this.api.post(url, data);
  }
  updateLesson(id: string, data: any) {
    const url = UPDATE_LESSON + `/${id}`;
    return this.api.put(url, data);
  }
  deleteLesson(id: string) {
    const url = DELETE_LESSON + `/${id}`;
    return this.api.delete(url);
  }
}
