import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonManagerPageComponent } from './lesson-manager-page.component';

describe('LessonManagerPageComponent', () => {
  let component: LessonManagerPageComponent;
  let fixture: ComponentFixture<LessonManagerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonManagerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
