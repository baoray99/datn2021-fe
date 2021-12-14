import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';

@Component({
  selector: 'app-user-learn',
  templateUrl: './user-learn.component.html',
  styleUrls: ['./user-learn.component.css'],
})
export class UserLearnComponent implements OnInit {
  course: Course;
  slug: string = '';
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseManagerService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getCourseBySlug(this.slug);
  }
  getCourseBySlug(slug: string) {
    this.courseService.getCourseBySlug(slug).subscribe(
      (res: any) => {
        this.course = null;
        if (res && res instanceof Object) {
          this.course = new Course(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
