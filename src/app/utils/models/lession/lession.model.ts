export class Lession {
  _id: string = '';
  belongTo: any = null;
  name: string = '';
  comments: Comment[] = [];
  idVideo: string = '';
  constructor(d = null) {
    d = d || null;
    this._id = d._id || '';
    this.belongTo = d.belongTo;
    this.name = d.name || '';
    this.comments = d.comments || [];
    this.idVideo = d.idVideo || '';
  }
}
