export class Lesson {
  _id: string = '';
  course_id: any = null;
  name: string = '';
  comments: Comment[] = [];
  video_id: string = '';
  constructor(d = null) {
    d = d || null;
    this._id = d._id || '';
    this.course_id = d.course_id;
    this.name = d.name || '';
    this.comments = d.comments || [];
    this.video_id = d.video_id || '';
  }
}
