import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lesson } from 'src/app/utils/models/lesson/lesson.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';
import { LessonManagerService } from 'src/app/utils/services/aas-network/lesson-manager/lesson-manager.service';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.css'],
})
export class LessonPageComponent implements OnInit {
  slug: string = '';
  course: Course = null;
  lessonList: Lesson[] = [];
  userId: string = '';
  registeredCourses: Course[] = [];
  isIncluded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseManagerService,
    private lessonService: LessonManagerService,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getCourseBySlug(this.slug);
    this.getMe();
  }
  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        if (res && res instanceof Object) {
          this.userId = res._id;
          this.getRegisteredCourses();
        }
      });
    }
  }
  getRegisteredCourses() {
    this.authService.getRegisteredCourses().subscribe((res: any) => {
      this.registeredCourses = [];
      if (res && res.registered_courses instanceof Array) {
        res.registered_courses.forEach((item) => {
          this.registeredCourses.push(new Course(item));
        });
        this.checkCourse(this.course);
      }
    });
  }

  getCourseBySlug(slug: string) {
    this.courseService.getCourseBySlug(slug).subscribe(
      (res: any) => {
        this.course = null;
        if (res && res instanceof Object && res.lessons instanceof Array) {
          this.course = new Course(res);
          res.lessons.forEach((item) => {
            this.lessonList.push(new Lesson(item));
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  registerCourse(courseId: string) {
    if (localStorage.getItem('token')) {
      this.authService
        .addRegisteredCourse({
          course_id: courseId,
          user_id: this.userId,
        })
        .subscribe(
          (res: any) => {
            this.message.success('Đăng ký khóa học thành công!');
            this.router.navigate([`/learn/${this.slug}`]);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.router.navigate(['/login']);
    }
  }
  checkCourse(course) {
    if (this.registeredCourses.some((item) => item.slug === course.slug)) {
      this.isIncluded = true;
    } else this.isIncluded = false;
  }
}
