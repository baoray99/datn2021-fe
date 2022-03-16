import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Image } from 'src/app/utils/models/photo/image.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { ImageService } from 'src/app/utils/services/aas-network/image/image.service';

@Component({
  selector: 'app-edit-me-page',
  templateUrl: './edit-me-page.component.html',
  styleUrls: ['./edit-me-page.component.css'],
})
export class EditMePageComponent implements OnInit {
  user: User = null;
  tempUser: User = null;
  isEdit: boolean = false;
  selectedImage: FileList;
  currentImageUpload: Image;
  constructor(
    private authService: AuthService,
    private message: NzMessageService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('token')) {
      this.getMe();
    }
  }
  toggleEdit(cls) {
    this.isEdit = !this.isEdit;
    document
      .querySelector<HTMLElement>(`.btn-edit-${cls}`)
      .classList.toggle('active');
    document
      .querySelector<HTMLElement>(`.group-edit-${cls}`)
      .classList.toggle('active');
    if (cls !== 'avatar') {
      if (this.isEdit) {
        document
          .querySelector<HTMLElement>(`.val-${cls}`)
          .removeAttribute('disabled');
        document.querySelector<HTMLElement>(`.val-${cls}`).focus();
      } else {
        document
          .querySelector<HTMLElement>(`.val-${cls}`)
          .setAttribute('disabled', '');
      }
    }
  }
  toggleUpload(cls) {
    this.toggleEdit(cls);
    document
      .querySelector<HTMLElement>('.edit-group__label-avatar')
      .classList.toggle('active');
  }
  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        this.user = null;
        if (res && res instanceof Object) {
          this.user = res;
          this.tempUser = { ...this.user };
        }
      });
    }
  }
  submitChange() {
    this.authService.userUpdate(this.user._id, this.user).subscribe(
      (res: any) => {
        this.message.success('Cập nhật tài khoản thành công!');
        this.getMe();
      },
      (error) => {
        this.message.error('Cập nhật tài khoản không thành công!');
      }
    );
  }
  cancelEdit(prop) {
    this.user[`${prop}`] = this.tempUser[`${prop}`];
  }
  upload(event): void {
    this.selectedImage = event.target.files;
    const file = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.currentImageUpload = this.imageService.uploadFileUser(new Image(file));
    // if (this.currentImageUpload.url !== '') {
    //   document.querySelector<HTMLElement>(
    //     '.edit-group__avatar'
    //   ).style.backgroundImage = `url('${this.currentImageUpload.url}')`;
    //   this.user.avatar = this.currentImageUpload.url;
    // }
    setTimeout(() => {
      document.querySelector<HTMLElement>(
        '.edit-group__avatar'
      ).style.backgroundImage = `url('${this.currentImageUpload.url}')`;
      this.user.avatar = this.currentImageUpload.url;
    }, 5000);
  }
}
