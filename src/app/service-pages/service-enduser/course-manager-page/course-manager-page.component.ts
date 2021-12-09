import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Image } from 'src/app/utils/models/photo/image.model';
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
    belongToId: '',
    description: '',
    image: '',
    members: 0,
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
          this.getCoursesByTeacherId(this.userId);
        }
      });
    }
  }
  getCoursesByTeacherId(id: string) {
    this.courseService.getCourseByTeacherId(id).subscribe((res: any) => {
      this.courseList = [];
      if (res && res instanceof Array) {
        res.forEach((item) => {
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
          belongToId: '',
          description: '',
          image: '',
          members: 0,
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
      belongToId: '',
      description: '',
      image: '',
      members: 0,
      name: '',
      rating: 0,
      slug: '',
    };
  }
  submitForm(): void {
    if (this.formCourse.valid) {
      console.log(this.formCourse.value, this.currentImageUpload.url);
      if (this.isEdit) {
        const editCourse = {
          name: this.formCourse.value.name,
          description: this.formCourse.value.description,
          image:
            this.currentImageUpload.url === ''
              ? 'https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/257381852_2063613163807356_6047570001632965703_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=RAbrfAuy2i8AX9BAPz4&_nc_ht=scontent.fdad2-1.fna&oh=930fc5be40cd09a5cbe3bcd9d1b3a824&oe=61A3430E'
              : this.currentImageUpload.url,
        };
        this.courseService
          .updateCourse(this.selectedCourse._id, editCourse)
          .subscribe(
            (res: any) => {
              console.log('update success');
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        const newCourse = {
          belongToId: this.userId,
          name: this.formCourse.value.name,
          description: this.formCourse.value.description,
          image:
            this.currentImageUpload.url === ''
              ? 'https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/257381852_2063613163807356_6047570001632965703_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=RAbrfAuy2i8AX9BAPz4&_nc_ht=scontent.fdad2-1.fna&oh=930fc5be40cd09a5cbe3bcd9d1b3a824&oe=61A3430E'
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
