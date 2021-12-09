export class Image {
  key: string = '';
  uid: string = '';
  name: string = '';
  url: string = '';
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
