import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lession } from 'src/app/utils/models/lession/lession.model';
import { User } from 'src/app/utils/models/user/user.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CommentManagerService } from 'src/app/utils/services/aas-network/comment-manager/comment-manager.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';
import { LessionManagerService } from 'src/app/utils/services/aas-network/lession-manager/lession-manager.service';

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
    private lessionService: LessionManagerService,
    private authService: AuthService,
    private fb: FormBuilder,
    private commentService: CommentManagerService
  ) {
    this.route.queryParamMap.subscribe((query) => {
      this.getLessionById(query.get('_id'));
    });
  }
  isCollapse: boolean = false;
  slug: string = '';
  idLession: string = '';
  user: User = null;
  course: Course;
  lessionList: Lession[] = [];
  currentLession: Lession = null;
  currentVideo: string = '';
  formComment: FormGroup;
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.idLession = this.route.snapshot.queryParamMap.get('_id');
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
  pushComment() {
    if (this.formComment.valid) {
      const newComment = {
        userId: this.user._id,
        lessionId: this.currentLession._id,
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
  collapseLession(): void {
    const content = document.querySelector<HTMLElement>('.content');
    const viewCourse = document.querySelector<HTMLElement>('.view-course');
    const relateContent =
      document.querySelector<HTMLElement>('.relate-content');
    const lessions = document.querySelector<HTMLElement>('.lessions');
    const btnExpand = document.querySelector<HTMLElement>(
      '.view-course__expand-btn'
    );
    this.isCollapse = !this.isCollapse;
    if (this.isCollapse) {
      lessions.style.display = 'none';
      content.classList.add('col');
      content.classList.add('col-lg-12');
      viewCourse.style.height = '70vh';
      viewCourse.style.padding = '0 18%';
      relateContent.style.padding = '0 18%';
      btnExpand.classList.add('active');
    }
  }
  expandLession(): void {
    const content = document.querySelector<HTMLElement>('.content');
    const viewCourse = document.querySelector<HTMLElement>('.view-course');
    const relateContent =
      document.querySelector<HTMLElement>('.relate-content');
    const lessions = document.querySelector<HTMLElement>('.lessions');
    const btnExpand = document.querySelector<HTMLElement>(
      '.view-course__expand-btn'
    );
    this.isCollapse = false;
    lessions.style.display = 'block';
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
        if (res && res instanceof Object && res.lessions instanceof Array) {
          this.course = res;
          res.lessions.forEach((item) => {
            this.lessionList.push(new Lession(item));
          });
        }
        this.router.navigate(['/learn', this.course.slug], {
          queryParams: { _id: this.course.lessions[0]._id },
        });
        this.getLessionById(this.idLession);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getLessionById(id: string) {
    this.lessionService.getLessionById(id).subscribe((res: any) => {
      this.currentLession = null;
      if (res && res instanceof Object && res.comments instanceof Array) {
        this.currentLession = new Lession(res);
        document.querySelector<HTMLIFrameElement>('.view-course-ytb').src =
          'https://www.youtube.com/embed/' + this.currentLession.idVideo;
      }
    });
  }
  changeCurrentVideo() {
    const listLession =
      document.querySelectorAll<HTMLElement>('.list-lession-item');
    listLession.forEach((item) => {
      item.addEventListener('click', function () {
        document
          .querySelector<HTMLElement>('.list-lession-item.active')
          .classList.remove('active');
        this.classList.add('active');
      });
    });
  }
}
