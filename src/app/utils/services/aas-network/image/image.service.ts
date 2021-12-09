import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Image } from '../../../models/photo/image.model';

const COURSE_IMAGE = '/course_image';
const USER_IMAGE = '/user_image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}
  // pushFileToStorage(
  //   Image: Image,
  //   uploaded: any,
  //   self: any
  //   //callback khi xong task se chay
  // ): Observable<number> {
  //   const filePath = `${COURSE_IMAGE}/${Image.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, Image.file);

  //   uploadTask
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         storageRef.getDownloadURL().subscribe((downloadURL) => {
  //           Image.url = downloadURL;
  //           Image.name = Image.file.name;
  //           this.saveFileData(Image);
  //           this.callback(downloadURL, uploaded, self);
  //         });
  //       })
  //     )
  //     //show % tien do, progress bar
  //     .subscribe();
  //   return uploadTask.percentageChanges();
  // }
  // callback(data, uploaded: any, self: any) {
  //   uploaded && uploaded instanceof Function && uploaded(data, self);
  //   truyen self để lấy thuộc tinh trong class đích
  // }
  uploadFile(image: Image) {
    const filePath = `${COURSE_IMAGE}/${image.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, image.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            image.url = downloadURL;
            image.name = image.file.name;
            this.saveFileData(image);
          });
        })
      )
      //show % tien do, progress bar
      .subscribe();
    return image;
  }

  private saveFileData(Image: Image): void {
    this.db.list(COURSE_IMAGE).push(Image);
  }

  getFiles(numberItems): AngularFireList<Image> {
    return this.db.list(COURSE_IMAGE, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(Image: Image): void {
    this.deleteFileDatabase(Image.key)
      .then(() => {
        this.deleteFileStorage(Image.name);
        console.log('success');
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(COURSE_IMAGE).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(COURSE_IMAGE);
    storageRef.child(name).delete();
  }
}
