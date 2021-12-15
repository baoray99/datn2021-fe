import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Course } from 'src/app/utils/models/course/course.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';
import 'lodash';
declare var _: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  lodash = _;
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
  user: User = null;
  courseList: Course[] = [];
  registeredCourses: Course[] = [];
  popularCourses: Course[] = [];
  isRegistered: boolean = false;
  constructor(
    private courseService: CourseManagerService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getMe();
    } else {
      this.getPopularCourse();
    }
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
        this.user = null;
        if (res && res instanceof Object) {
          this.user = res;
          if (this.user.role === 'teacher') {
            this.getCoursesByTeacherId(this.user._id);
          } else if (this.user.role === 'student') {
            this.getRegisteredCourse(this.user._id);
          }
          this.getPopularCourse();
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
  getRegisteredCourse(id: string) {
    this.authService.getRegisteredCourses(id).subscribe((res: any) => {
      this.registeredCourses = [];
      if (res && res.registeredCourses instanceof Array) {
        res.registeredCourses.forEach((item) => {
          this.registeredCourses.push(new Course(item));
        });
      }
    });
  }
  getPopularCourse() {
    this.courseService.getPopularCourse().subscribe(
      (res: any) => {
        this.popularCourses = [];
        if (res && res instanceof Array) {
          res.forEach((item) => {
            this.popularCourses.push(new Course(item));
          });
        }
        if (this.user) {
          this.popularCourses = _.filter(this.popularCourses, (n) => {
            return !_.some(this.registeredCourses, (kn) => {
              return n.name === kn.name;
            });
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  checkRegisterCourse(slug: string) {
    if (this.user && this.user instanceof Object) {
      this.user.registeredCourses.forEach((item) => {
        if (item.slug === slug) {
          this.isRegistered = true;
        } else this.isRegistered = false;
      });
    }
  }
}
