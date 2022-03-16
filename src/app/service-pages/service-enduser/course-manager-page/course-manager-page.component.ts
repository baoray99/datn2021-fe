import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Image } from 'src/app/utils/models/photo/image.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { ImageService } from 'src/app/utils/services/aas-network/image/image.service';
import { Course } from '../../../utils/models/course/course.model';
import { CourseManagerService } from '../../../utils/services/aas-network/course-manager/course-manager.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-course-manager-page',
  templateUrl: './course-manager-page.component.html',
  styleUrls: ['./course-manager-page.component.css'],
})
export class CourseManagerPageComponent implements OnInit {
  courseList: Course[] = [];
  userId: string = '';
  visible = false;
  formCourse!: FormGroup;
  selectedCourse: Course = {
    _id: '',
    user_id: null,
    description: '',
    image: '',
    total_member: 0,
    lessons: [],
    members: [],
    name: '',
    rating: 0,
    slug: '',
  };
  selectedImage: FileList;
  currentImageUpload: Image;
  isEdit: boolean = false;
  constructor(
    private courseService: CourseManagerService,
    private authService: AuthService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getMe();
    this.formCourse = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
  }
  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        if (res && res instanceof Object) {
          this.userId = res._id;
          this.getTeachingCourse();
        }
      });
    }
  }

  getTeachingCourse() {
    this.authService.getTeachingCourse().subscribe((res: any) => {
      this.courseList = [];
      if (res && res.teaching_courses instanceof Array) {
        res.teaching_courses.forEach((item) => {
          this.courseList.push(new Course(item));
        });
      }
    });
  }
  toggleEdit(id: string) {
    this.isEdit = true;
    this.courseService.getCourseById(id).subscribe(
      (res: any) => {
        this.selectedCourse = {
          _id: '',
          user_id: null,
          description: '',
          image: '',
          total_member: 0,
          members: [],
          lessons: [],
          name: '',
          rating: 0,
          slug: '',
        };
        if (res && res instanceof Object) {
          this.selectedCourse = new Course(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.open();
  }
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
    this.isEdit = false;
    this.selectedCourse = {
      _id: '',
      user_id: null,
      description: '',
      image: '',
      members: [],
      total_member: 0,
      lessons: [],
      name: '',
      rating: 0,
      slug: '',
    };
  }
  submitForm(): void {
    if (this.formCourse.valid) {
      if (this.isEdit) {
        const editCourse = {
          name: this.formCourse.value.name,
          description: this.formCourse.value.description,
          image:
            this.selectedCourse.image !== ''
              ? this.selectedCourse.image
              : this.currentImageUpload
              ? this.currentImageUpload.url
              : 'https://firebasestorage.googleapis.com/v0/b/datn2021-76049.appspot.com/o/course_image%2F257381852_2063613163807356_6047570001632965703_n.jpg?alt=media&token=a4bd388e-d539-4039-aef5-f3ad50ff59a0',
        };
        this.courseService
          .updateCourse(this.selectedCourse._id, editCourse)
          .subscribe(
            (res: any) => {
              this.message.success('Cập nhật khóa học thành công!');
              this.close();
              this.getMe();
            },
            (error) => {
              console.log(error);
              this.message.error('Cập nhật khóa học thất bại!');
            }
          );
      } else {
        const newCourse = {
          user_id: this.userId,
          name: this.formCourse.value.name,
          description: this.formCourse.value.description,
          image:
            this.currentImageUpload.url === ''
              ? 'https://firebasestorage.googleapis.com/v0/b/datn2021-76049.appspot.com/o/course_image%2F257381852_2063613163807356_6047570001632965703_n.jpg?alt=media&token=a4bd388e-d539-4039-aef5-f3ad50ff59a0'
              : this.currentImageUpload.url,
        };
        this.courseService.createCourse(newCourse).subscribe((res: any) => {
          this.message.success('Tạo khóa học thành công!');
          this.close();
          this.getMe();
        }),
          (error) => {
            console.log(error);
            this.message.success('Tạo khóa học thất bại!');
          };
      }
    } else {
      Object.values(this.formCourse.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  upload(event): void {
    this.selectedImage = event.target.files;
    const file = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.currentImageUpload = this.imageService.uploadFile(new Image(file));
  }
  showDeleteConfirm(id): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa khóa học này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOnOk: () =>
        this.courseService.deleteCourse(id).subscribe((res: any) => {
          this.message.success('Xóa khóa học thành công!');
          this.getMe();
        }),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  cancel() {}
  deleteImage() {
    if (this.currentImageUpload) {
      this.currentImageUpload.url = '';
    }
    this.selectedCourse.image = '';
  }
}
