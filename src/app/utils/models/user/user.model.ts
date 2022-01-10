import { Course } from '../course/course.model';
export class User {
  _id: string = '';
  name: string = '';
  birthday: Date;
  gender: boolean;
  phone: string = '';
  avatar: string = '';
  bio: string = '';
  facebook: string = '';
  instagram: string = '';
  youtube: string = '';
  registeredCourse: Array<Course> = [];
  teachingCourse: Array<Course> = [];
  email: string = '';
  role: any;

  constructor(d = null) {
    d = d || {};
    this._id = d._id || '';
    this.name = d.name || '';
    this.birthday = d.birthday;
    this.gender = d.gender;
    this.phone = d.phone || '';
    this.avatar = d.avatar || '';
    this.bio = d.bio || '';
    this.facebook = d.facebook || '';
    this.instagram = d.instagram || '';
    this.youtube = d.youtube || '';
    this.email = d.email || '';
    this.registeredCourse = d.registeredCourse || [];
    this.teachingCourse = d.teachingCourse || [];
    this.role = d.role || null;
  }
}
