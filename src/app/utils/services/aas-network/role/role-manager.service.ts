import { Injectable } from '@angular/core';
import { API } from '../../api';
import { ServicePath } from '../../../common/constant-service-api';

const ROLE_LIST = ServicePath.ROLE_SERVICE + '/all';
@Injectable({
  providedIn: 'root',
})
export class RoleManagerService {
  constructor(private api: API) {}

  getAllRole() {
    const url = ROLE_LIST;
    return this.api.get(url);
  }
}
