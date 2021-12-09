import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManagerPageComponent } from './course-manager-page.component';

describe('CourseManagerPageComponent', () => {
  let component: CourseManagerPageComponent;
  let fixture: ComponentFixture<CourseManagerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseManagerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
