import { Lesson } from '../lesson/lesson.model';
import { User } from '../user/user.model';

export class Comment {
  _id: string = '';
  user_id: User = null;
  lesson_id: Lesson = null;
  content: string = '';
  constructor(d = null) {
    d = d || null;
    this._id = d._id || '';
    this.user_id = d.user_id || null;
    this.lesson_id = d.lesson_id;
    this.content = d.content || '';
  }
}
