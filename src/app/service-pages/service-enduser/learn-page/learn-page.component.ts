import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lesson } from 'src/app/utils/models/lesson/lesson.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CommentManagerService } from 'src/app/utils/services/aas-network/comment-manager/comment-manager.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';
import { LessonManagerService } from 'src/app/utils/services/aas-network/lesson-manager/lesson-manager.service';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.css'],
})
export class LearnPageComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseManagerService,
    private lessonService: LessonManagerService,
    private authService: AuthService,
    private fb: FormBuilder,
    private commentService: CommentManagerService
  ) {
    this.route.queryParamMap.subscribe((query) => {
      this.getLessonById(query.get('_id'));
    });
  }
  isCollapse: boolean = false;
  slug: string = '';
  idLesson: string = '';
  user: User = null;
  course: Course;
  lessonList: Lesson[] = [];
  currentLesson: Lesson = null;
  currentVideo: string = '';
  formComment: FormGroup;
  relateCourses = [];
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.idLesson = this.route.snapshot.queryParamMap.get('_id');
    this.formComment = this.fb.group({
      content: [null, [Validators.required]],
    });
    this.getCourseBySlug(this.slug);
    this.getMe();
  }
  ngAfterViewInit(): void {
    const tabs = document.querySelectorAll<HTMLElement>('.tab-item');
    const panes = document.querySelectorAll<HTMLElement>('.tab-pane');
    const line = document.querySelector<HTMLElement>('.tab-line');
    const activeTab = document.querySelector<HTMLElement>('.tab-item.active');
    line.style.left = activeTab.offsetLeft.toString() + 'px';
    line.style.width = activeTab.offsetWidth.toString() + 'px';
    tabs.forEach((tab, index) => {
      const pane = panes[index];
      tab.addEventListener('click', function () {
        document
          .querySelector<HTMLElement>('.tab-item.active')
          .classList.remove('active');
        document
          .querySelector<HTMLElement>('.tab-pane.active')
          .classList.remove('active');
        this.classList.add('active');
        pane.classList.add('active');
        line.style.left = this.offsetLeft.toString() + 'px';
        line.style.width = this.offsetWidth.toString() + 'px';
      });
    });
  }
  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        this.user = null;
        if (res && res instanceof Object) {
          this.user = new User(res);
        }
      });
    }
  }
  getRelateCourse(courseName: string) {
    this.courseService
      .getRelateCourses({
        courseName: courseName,
      })
      .subscribe((res: any) => {
        if (res && res instanceof Array) {
          this.relateCourses = [];
          res.forEach((item) => {
            this.relateCourses.push(item);
          });
        }
      });
  }
  pushComment() {
    if (this.formComment.valid) {
      const newComment = {
        user_id: this.user._id,
        lesson_id: this.currentLesson._id,
        content: this.formComment.value.content,
      };
      this.commentService.createComment(newComment).subscribe(
        (res: any) => {
          console.log('create success');
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Object.values(this.formComment.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  collapseLesson(): void {
    const content = document.querySelector<HTMLElement>('.content');
    const viewCourse = document.querySelector<HTMLElement>('.view-course');
    const relateContent =
      document.querySelector<HTMLElement>('.relate-content');
    const lessons = document.querySelector<HTMLElement>('.lessons');
    const btnExpand = document.querySelector<HTMLElement>(
      '.view-course__expand-btn'
    );
    this.isCollapse = !this.isCollapse;
    if (this.isCollapse) {
      lessons.style.display = 'none';
      content.classList.add('col');
      content.classList.add('col-lg-12');
      viewCourse.style.height = '70vh';
      viewCourse.style.padding = '0 18%';
      relateContent.style.padding = '0 18%';
      btnExpand.classList.add('active');
    }
  }
  expandLesson(): void {
    const content = document.querySelector<HTMLElement>('.content');
    const viewCourse = document.querySelector<HTMLElement>('.view-course');
    const relateContent =
      document.querySelector<HTMLElement>('.relate-content');
    const lessons = document.querySelector<HTMLElement>('.lessons');
    const btnExpand = document.querySelector<HTMLElement>(
      '.view-course__expand-btn'
    );
    this.isCollapse = false;
    lessons.style.display = 'block';
    content.classList.remove('col');
    content.classList.remove('col-lg-12');
    btnExpand.classList.remove('active');
    viewCourse.style.height = '65vh';
    viewCourse.style.padding = '0 8.5%';
    relateContent.style.padding = '0 8.5%';
  }
  showBtn() {
    document.querySelector<HTMLElement>(
      '.comment-tab__btn-group'
    ).style.visibility = 'visible';
  }
  hideBtn() {
    document.querySelector<HTMLElement>(
      '.comment-tab__btn-group'
    ).style.visibility = 'hidden';
  }
  getCourseBySlug(slug: string) {
    this.courseService.getCourseBySlug(slug).subscribe(
      (res: any) => {
        this.course = null;
        if (res && res instanceof Object && res.lessons instanceof Array) {
          this.course = res;
          res.lessons.forEach((item) => {
            this.lessonList.push(new Lesson(item));
          });
        }
        this.router.navigate(['/learn', this.course.slug], {
          queryParams: { _id: this.course.lessons[0]._id },
        });
        this.getLessonById(this.idLesson);
        this.getRelateCourse(this.course.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getLessonById(id: string) {
    this.lessonService.getLessonById(id).subscribe((res: any) => {
      this.currentLesson = null;
      if (res && res instanceof Object && res.comments instanceof Array) {
        this.currentLesson = new Lesson(res);
        document.querySelector<HTMLIFrameElement>('.view-course-ytb').src =
          'https://www.youtube.com/embed/' + this.currentLesson.video_id;
      }
    });
  }
  changeCurrentVideo(id) {
    const listLesson =
      document.querySelectorAll<HTMLElement>('.list-lesson-item');
    listLesson.forEach((item) => {
      item.addEventListener('click', function () {
        document
          .querySelector<HTMLElement>('.list-lesson-item.active')
          .classList.remove('active');
        this.classList.add('active');
      });
    });
  }
}
