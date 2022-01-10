import { Lession } from '../lession/lession.model';
import { User } from '../user/user.model';

export class Course {
  _id: string = '';
  author: User;
  name: string = '';
  description: string = '';
  image: string = '';
  slug: string = '';
  totalMember: number = 0;
  rating: number = 0;
  members: Array<User> = [];
  lessions: Array<Lession> = [];

  constructor(d = null) {
    d = d || {};
    this._id = d._id || '';
    this.author = d.author || null;
    this.name = d.name || '';
    this.description = d.description || '';
    this.image = d.image || '';
    this.slug = d.slug || '';
    this.rating = d.rating || 0;
    this.members = d.members || [];
    this.totalMember = d.totalMember || 0;
    this.lessions = d.lessions || [];
  }
}
