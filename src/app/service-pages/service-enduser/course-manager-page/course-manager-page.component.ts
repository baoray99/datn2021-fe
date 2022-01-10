import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Image } from 'src/app/utils/models/photo/image.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { ImageService } from 'src/app/utils/services/aas-network/image/image.service';
import { Course } from '../../../utils/models/course/course.model';
import { CourseManagerService } from '../../../utils/services/aas-network/course-manager/course-manager.service';

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
    author: null,
    description: '',
    image: '',
    totalMember: 0,
    lessions: [],
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
    private imageService: ImageService
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
      if (res && res.teachingCourse instanceof Array) {
        res.teachingCourse.forEach((item) => {
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
          author: null,
          description: '',
          image: '',
          totalMember: 0,
          members: [],
          lessions: [],
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
      author: null,
      description: '',
      image: '',
      members: [],
      totalMember: 0,
      lessions: [],
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
              console.log('update success');
              this.close();
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        const newCourse = {
          author: this.userId,
          name: this.formCourse.value.name,
          description: this.formCourse.value.description,
          image:
            this.currentImageUpload.url === ''
              ? 'https://firebasestorage.googleapis.com/v0/b/datn2021-76049.appspot.com/o/course_image%2F257381852_2063613163807356_6047570001632965703_n.jpg?alt=media&token=a4bd388e-d539-4039-aef5-f3ad50ff59a0'
              : this.currentImageUpload.url,
        };
        this.courseService.createCourse(newCourse).subscribe((res: any) => {
          console.log('add course success');
          this.close();
        }),
          (error) => {
            console.log(error);
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
  confirmDeleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe((res: any) => {}),
      (error) => {};
  }
  cancel() {}
  deleteImage() {
    if (this.currentImageUpload) {
      this.currentImageUpload.url = '';
    }
    this.selectedCourse.image = '';
  }
}
