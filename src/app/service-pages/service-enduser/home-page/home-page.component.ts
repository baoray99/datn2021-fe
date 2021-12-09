import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Course } from 'src/app/utils/models/course/course.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';

var i = 0;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    autoHeight: false,
    autoWidth: true,
    touchDrag: false,
    pullDrag: false,
    margin: 15,
    dots: false,
    navSpeed: 700,
    navText: [
      '<div class="nav-btn"><i class="fas fa-chevron-left"></i></div>',
      '<div class="nav-btn"><i class="fas fa-chevron-right"></i></div>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  courseList: Course[] = [];
  userId: string = '';
  user: User = null;
  registeredCourses: Course[] = [];
  constructor(
    private courseService: CourseManagerService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getMe();
  }
  ngAfterViewInit(): void {}
  nextSlide() {
    const courseItem = document.querySelector<HTMLElement>(
      '.home__teaching-courses-slide'
    );
    courseItem.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
  prevSlide() {
    const courseItem = document.querySelector<HTMLElement>(
      '.home__teaching-courses-slide'
    );
    courseItem.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }
  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        this.userId = '';
        this.user = null;
        if (res && res instanceof Object) {
          this.userId = res._id;
          this.user = res;
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
  getRegisteredCourse() {
    this.authService.getRegisteredCourses().subscribe((res: any) => {
      this.registeredCourses = [];
      if (res && res.registeredCourses instanceof Array) {
        res.registeredCourses.forEach((item) => {
          this.registeredCourses.push(new Course(item));
        });
      }
    });
  }
}
