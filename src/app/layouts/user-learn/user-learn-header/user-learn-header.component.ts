import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/utils/models/course/course.model';

@Component({
  selector: 'app-user-learn-header',
  templateUrl: './user-learn-header.component.html',
  styleUrls: ['./user-learn-header.component.css'],
})
export class UserLearnHeaderComponent implements OnInit {
  @Input('course') set course(value: any) {
    this._course = value;
  }
  private _course: Course;
  get course() {
    return this._course;
  }
  constructor() {}

  ngOnInit(): void {}
}
