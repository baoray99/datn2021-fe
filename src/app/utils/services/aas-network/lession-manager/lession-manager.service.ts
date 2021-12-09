import { Injectable } from '@angular/core';
import { API } from '../../api';
import { ServicePath } from '../../../common/constant-service-api';
import { Lession } from 'src/app/utils/models/lession/lession.model';

const LESSION_BY_COURSEID = ServicePath.LESSION_SERVICE + '?courseId=';
const CREATE_LESSION = ServicePath.LESSION_SERVICE;
const LESSION_BY_ID = ServicePath.LESSION_SERVICE;
const UPDATE_LESSION = ServicePath.LESSION_SERVICE;
const DELETE_LESSION = ServicePath.LESSION_SERVICE;
@Injectable({
  providedIn: 'root',
})
export class LessionManagerService {
  constructor(private api: API) {}
  getLessionByCourseId(courseId: string) {
    const url = LESSION_BY_COURSEID + `${courseId}`;
    return this.api.get(url);
  }

  getLessionById(id: string) {
    const url = LESSION_BY_ID + `/${id}`;
    return this.api.get(url);
  }
  createLession(data: any) {
    const url = CREATE_LESSION;
    return this.api.post(url, data);
  }
  updateLession(id: string, data: any) {
    const url = UPDATE_LESSION + `/${id}`;
    return this.api.put(url, data);
  }
  deleteLession(id: string) {
    const url = DELETE_LESSION + `/${id}`;
    return this.api.delete(url);
  }
}
