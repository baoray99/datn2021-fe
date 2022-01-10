import { Lession } from '../lession/lession.model';
import { User } from '../user/user.model';

export class Comment {
  _id: string = '';
  user: User = null;
  belongTo: Lession = null;
  content: string = '';
  constructor(d = null) {
    d = d || null;
    this._id = d._id || '';
    this.user = d.user || null;
    this.belongTo = d.belongTo;
    this.content = d.content || '';
  }
}
