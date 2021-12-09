export class Lession {
  _id: string = '';
  belongToId: string = '';
  name: string = '';
  videoLink: string = '';
  constructor(d = null) {
    d = d || null;
    this._id = d._id || '';
    this.belongToId = d.belongToId;
    this.name = d.name || '';
    this.videoLink = d.videoLink || '';
  }
}
