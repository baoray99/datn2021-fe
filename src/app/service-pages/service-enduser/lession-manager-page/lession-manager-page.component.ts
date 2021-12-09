import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/utils/models/course/course.model';
import { Lession } from 'src/app/utils/models/lession/lession.model';
import { LessionManagerService } from 'src/app/utils/services/aas-network/lession-manager/lession-manager.service';
import { CourseManagerService } from '../../../utils/services/aas-network/course-manager/course-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lession-manager-page',
  templateUrl: './lession-manager-page.component.html',
  styleUrls: ['./lession-manager-page.component.css'],
})
export class LessionManagerPageComponent implements OnInit {
  slug: string = '';
  course: Course = null;
  courseId: string = '';
  lessionList: Lession[] = [];
  lessionForm!: FormGroup;
  selectedLession: Lession = {
    _id: '',
    belongToId: '',
    name: '',
    videoLink: '',
  };
  isVisible = false;
  isEdit = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseManagerService,
    private lessionService: LessionManagerService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.slug = this.route.snapshot.queryParamMap.get('name');
    this.getCourseBySlug(this.slug);
    this.lessionForm = this.fb.group({
      name: [null, [Validators.required]],
      videoLink: [null, [Validators.required]],
    });
  }
  lessionFormSubmit() {
    if (this.lessionForm.valid) {
      console.log('submit', this.lessionForm.value);
      if (this.isEdit) {
        const updateLession = {
          name: this.lessionForm.value.name,
          videoLink: this.lessionForm.value.videoLink,
        };
        this.lessionService
          .updateLession(this.selectedLession._id, updateLession)
          .subscribe(
            (res: any) => {
              console.log('update success');
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        const newLession = {
          belongToId: this.courseId,
          name: this.lessionForm.value.name,
          videoLink: this.lessionForm.value.videoLink,
        };
        this.lessionService.createLession(newLession).subscribe(
          (res: any) => {
            console.log('create success');
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      Object.values(this.lessionForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  toggleEdit(id: string) {
    this.isEdit = true;
    this.lessionService.getLessionById(id).subscribe((res: any) => {
      this.selectedLession = {
        _id: '',
        belongToId: '',
        name: '',
        videoLink: '',
      };
      if (res && res instanceof Object) {
        this.selectedLession = res;
      }
    });
    if (this.isEdit) {
      this.toggleLessionForm();
    }
  }
  toggleLessionForm() {
    const lessionForm = document.querySelector<HTMLElement>(
      '.lession-form__modal'
    );
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      lessionForm.style.display = 'flex';
    } else {
      lessionForm.style.display = 'none';
      this.isEdit = false;
      this.selectedLession = {
        _id: '',
        belongToId: '',
        name: '',
        videoLink: '',
      };
    }
  }
  getCourseBySlug(slug: string) {
    this.courseService.getCourseBySlug(slug).subscribe(
      (res: any) => {
        this.course = null;
        this.courseId = '';
        if (res && res instanceof Object) {
          this.course = res;
          this.courseId = res._id;
          this.getLessionByCourseId(this.courseId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getLessionByCourseId(courseId: string) {
    this.lessionService.getLessionByCourseId(courseId).subscribe(
      (res: any) => {
        this.lessionList = [];
        if (res && res instanceof Array) {
          res.forEach((item) => {
            this.lessionList.push(new Lession(item));
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteLession(id: string) {
    this.lessionService.deleteLession(id).subscribe(
      (res: any) => {
        console.log('delete success');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
