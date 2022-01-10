export class Role {
  _id: string = '';
  name: string = '';
  slug: string = '';
  constructor(d = null) {
    d = d || null;
    this._id = d._id || '';
    this.name = d.name || '';
    this.slug = d.slug || '';
  }
}
