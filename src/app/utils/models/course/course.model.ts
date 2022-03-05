import { Lesson } from '../lesson/lesson.model';
import { User } from '../user/user.model';

export class Course {
  _id: string = '';
  user_id: User;
  name: string = '';
  description: string = '';
  image: string = '';
  slug: string = '';
  total_member: number = 0;
  rating: number = 0;
  members: Array<User> = [];
  lessons: Array<Lesson> = [];

  constructor(d = null) {
    d = d || {};
    this._id = d._id || '';
    this.user_id = d.user_id || null;
    this.name = d.name || '';
    this.description = d.description || '';
    this.image = d.image || '';
    this.slug = d.slug || '';
    this.rating = d.rating || 0;
    this.members = d.members || [];
    this.total_member = d.total_member || 0;
    this.lessons = d.lessons || [];
  }
}
