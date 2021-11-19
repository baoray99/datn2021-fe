import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLearnHeaderComponent } from './user-learn-header.component';

describe('UserLearnHeaderComponent', () => {
  let component: UserLearnHeaderComponent;
  let fixture: ComponentFixture<UserLearnHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLearnHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLearnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
