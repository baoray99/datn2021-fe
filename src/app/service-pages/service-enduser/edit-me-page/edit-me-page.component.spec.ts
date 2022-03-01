import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMePageComponent } from './edit-me-page.component';

describe('EditMePageComponent', () => {
  let component: EditMePageComponent;
  let fixture: ComponentFixture<EditMePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
