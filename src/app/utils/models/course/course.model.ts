export class Course {
  _id: string = '';
  belongToId: string = '';
  name: string = '';
  description: string = '';
  image: string = '';
  slug: string = '';
  rating: number = 0;
  members: number = 0;

  constructor(d = null) {
    d = d || {};
    this._id = d._id || '';
    this.name = d.name || '';
    this.description = d.description || '';
    this.image = d.image || '';
    this.slug = d.slug || '';
    this.rating = d.rating || 0;
    this.members = d.members || 0;
  }
}
