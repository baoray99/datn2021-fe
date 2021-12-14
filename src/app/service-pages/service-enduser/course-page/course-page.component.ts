import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/utils/models/course/course.model';
import { CourseManagerService } from 'src/app/utils/services/aas-network/course-manager/course-manager.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
})
export class CoursePageComponent implements OnInit {
  courseList: Course[] = [];
  constructor(private courseService: CourseManagerService) {}

  ngOnInit(): void {
    this.getAllCourse();
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
