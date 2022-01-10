import { Injectable } from '@angular/core';
import { ServicePath } from '../../../common/constant-service-api';
import { API } from '../../api';

const CREATE_COMMENT = ServicePath.COMMENT_SERVICE;
const UPDATE_COMMENT = ServicePath.COMMENT_SERVICE;
const DELETE_COMMENT= ServicePath.COMMENT_SERVICE;
@Injectable({
  providedIn: 'root',
})
export class CommentManagerService {
  constructor(private api: API) {}
  createComment(data) {
    const url = CREATE_COMMENT;
    return this.api.post(url, data);
  }
  updateComment(id, data) {
    const url = UPDATE_COMMENT + `/${id}`;
    return this.api.put(url, data);
  }
  deleteComment(id){
    const url= DELETE_COMMENT+`/${id}`
    return this.api.delete(url)
  }
}
