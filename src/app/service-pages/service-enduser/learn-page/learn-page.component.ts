import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lession } from 'src/app/utils/models/lession/lession.model';
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
    private courseService: CourseManagerService,
    private lessionService: LessionManagerService
  ) {}
  isCollapse: boolean = false;
  slug: string = '';
  course: Course;
  lessionList: Lession[] = [];
  currentVideo: string = '';
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getCourseBySlug(this.slug);
  }
  ngAfterViewInit(): void {
    const tabs = document.querySelectorAll<HTMLElement>('.tab-item');
    const line = document.querySelector<HTMLElement>('.tab-line');
    const activeTab = document.querySelector<HTMLElement>('.tab-item.active');
    line.style.left = activeTab.offsetLeft.toString() + 'px';
    line.style.width = activeTab.offsetWidth.toString() + 'px';
    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        document
          .querySelector<HTMLElement>('.tab-item.active')
          .classList.remove('active');
        this.classList.add('active');
        line.style.left = this.offsetLeft.toString() + 'px';
        line.style.width = this.offsetWidth.toString() + 'px';
      });
    });
  }
  collapseLession(): void {
    const content = document.querySelector<HTMLElement>('.content');
    const viewCourse = document.querySelector<HTMLElement>('.view-course');
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
      btnExpand.classList.add('active');
    }
  }
  expandLession(): void {
    const content = document.querySelector<HTMLElement>('.content');
    const viewCourse = document.querySelector<HTMLElement>('.view-course');
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
  }
  getCourseBySlug(slug: string) {
    this.courseService.getCourseBySlug(slug).subscribe(
      (res: any) => {
        this.course = null;
        if (res && res instanceof Object) {
          this.course = new Course(res);
          this.getLessionByCourseId(this.course._id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getLessionByCourseId(id: string) {
    const youtubeFrame =
      document.querySelector<HTMLIFrameElement>('.view-course-ytb');
    const listLession =
      document.querySelectorAll<HTMLElement>('.list-lession-item');
    this.lessionService.getLessionByCourseId(id).subscribe(
      (res: any) => {
        this.lessionList = [];
        if (res && res instanceof Array) {
          res.forEach((item) => {
            this.lessionList.push(new Lession(item));
          });
          this.currentVideo = this.lessionList[0].videoLink;
          youtubeFrame.src =
            'https://www.youtube.com/embed/' + this.currentVideo;
          listLession[0].classList.add('active');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  changeCurrentVideo(link: string) {
    const youtubeFrame =
      document.querySelector<HTMLIFrameElement>('.view-course-ytb');
    this.currentVideo = link;
    youtubeFrame.src = 'https://www.youtube.com/embed/' + this.currentVideo;
  }
}
