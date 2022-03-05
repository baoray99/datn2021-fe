import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lesson } from 'src/app/utils/models/lesson/lesson.model';
import { LessonManagerService } from 'src/app/utils/services/aas-network/lesson-manager/lesson-manager.service';
import { CourseManagerService } from '../../../utils/services/aas-network/course-manager/course-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-esson-manager-page',
  templateUrl: './lesson-manager-page.component.html',
  styleUrls: ['./lesson-manager-page.component.css'],
})
export class LessonManagerPageComponent implements OnInit {
  slug: string = '';
  course: Course = null;
  courseId: string = '';
  lessonList: Lesson[] = [];
  lessonForm!: FormGroup;
  selectedLesson: Lesson = {
    _id: '',
    course_id: null,
    name: '',
    comments: [],
    video_id: '',
  };
  isVisible = false;
  isEdit = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseManagerService,
    private lessonService: LessonManagerService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}
  ngOnInit(): void {
    this.slug = this.route.snapshot.queryParamMap.get('name');
    this.getCourseBySlug(this.slug);
    this.lessonForm = this.fb.group({
      name: [null, [Validators.required]],
      video_id: [null, [Validators.required]],
    });
  }
  lessonFormSubmit() {
    if (this.lessonForm.valid) {
      if (this.isEdit) {
        const updateLesson = {
          name: this.lessonForm.value.name,
          video_id: this.lessonForm.value.video_id,
        };
        this.lessonService
          .updateLesson(this.selectedLesson._id, updateLesson)
          .subscribe(
            (res: any) => {
              this.message.success('Update lesson successfully!');
              this.toggleLessonForm();
              this.getCourseBySlug(this.slug);
            },
            (error) => {
              console.log(error);
              this.message.error('Update lesson failed!');
            }
          );
      } else {
        const newLesson = {
          course_id: this.courseId,
          name: this.lessonForm.value.name,
          video_id: this.lessonForm.value.video_id,
        };
        this.lessonService.createLesson(newLesson).subscribe(
          (res: any) => {
            this.message.success('Create lesson successfully!');
            this.toggleLessonForm();
            this.getCourseBySlug(this.slug);
          },
          (error) => {
            console.log(error);
            this.message.error('Create lesson failed!');
          }
        );
      }
    } else {
      Object.values(this.lessonForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  toggleEdit(id: string) {
    this.isEdit = true;
    this.lessonService.getLessonById(id).subscribe((res: any) => {
      this.selectedLesson = {
        _id: '',
        course_id: null,
        name: '',
        comments: [],
        video_id: '',
      };
      if (res && res instanceof Object) {
        this.selectedLesson = res;
      }
    });
    if (this.isEdit) {
      this.toggleLessonForm();
    }
  }
  toggleLessonForm() {
    const lessonForm = document.querySelector<HTMLElement>(
      '.lesson-form__modal'
    );
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      lessonForm.style.display = 'flex';
    } else {
      lessonForm.style.display = 'none';
      this.isEdit = false;
      this.selectedLesson = {
        _id: '',
        course_id: null,
        comments: [],
        name: '',
        video_id: '',
      };
    }
  }
  getCourseBySlug(slug: string) {
    this.courseService.getCourseBySlug(slug).subscribe(
      (res: any) => {
        this.course = null;
        this.courseId = '';
        this.lessonList = [];
        if (res && res instanceof Object && res.lessons instanceof Array) {
          this.course = res;
          this.courseId = res._id;
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
  showDeleteConfirm(id): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa bài học này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOnOk: () =>
        this.lessonService.deleteLesson(id).subscribe((res: any) => {
          this.message.success('Xóa bài học thành công!');
          this.getCourseBySlug(this.slug);
        }),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
