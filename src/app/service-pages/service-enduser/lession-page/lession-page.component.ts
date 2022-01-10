import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lession } from 'src/app/utils/models/lession/lession.model';
import { AuthService } from 'src/app/utils/services/aas-network/auth/auth.service';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';
import { LessionManagerService } from 'src/app/utils/services/aas-network/lession-manager/lession-manager.service';

@Component({
  selector: 'app-lession-page',
  templateUrl: './lession-page.component.html',
  styleUrls: ['./lession-page.component.css'],
})
export class LessionPageComponent implements OnInit {
  slug: string = '';
  course: Course = null;
  lessionList: Lession[] = [];
  userId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseManagerService,
    private lessionService: LessionManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getMe();
    this.getCourseBySlug(this.slug);
  }
  getMe() {
    if (window.localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        if (res && res instanceof Object) {
          this.userId = res._id;
        }
      });
    }
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
          courseId: courseId,
          userId: this.userId,
        })
        .subscribe(
          (res: any) => {
            console.log('dang ky khoa hoc thanh cong');
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
}
