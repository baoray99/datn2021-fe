import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/utils/models/course/course.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
})
export class CoursePageComponent implements OnInit {
  courseList: Course[] = [];
  user: User = null;
  registeredCourses: Course[] = [];

  constructor(
    private authService: AuthService,
    private courseService: CourseManagerService
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('token')) {
      this.getMe();
    } else {
      this.getAllCourse();
    }
  }

  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        this.user = null;
        if (res && res instanceof Object) {
          this.user = res;
          this.getRegisteredCourse();
        }
      });
    }
  }
  getRegisteredCourse() {
    this.authService.getRegisteredCourses().subscribe(
      (res: any) => {
        this.registeredCourses = [];
        if (res && res.registered_courses instanceof Array) {
          res.registered_courses.forEach((item) => {
            this.registeredCourses.push(new Course(item));
          });
          this.getAllCourseWithLogin(this.registeredCourses);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllCourseWithLogin(registeredCourse: any) {
    const body = {
      registered_courses: registeredCourse,
    };
    this.authService.getAllCourseWithLogin(body).subscribe(
      (res: any) => {
        this.courseList = [];
        if (res && res instanceof Array) {
          res.forEach((item) => {
            this.courseList.push(new Course(item));
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllCourse() {
    this.courseService.getAllCourses().subscribe(
      (res: any) => {
        this.courseList = [];
        if (res && res instanceof Array) {
          res.forEach((item) => {
            this.courseList.push(new Course(item));
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
