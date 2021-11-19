import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLearnComponent } from './user-learn.component';

describe('UserLearnComponent', () => {
  let component: UserLearnComponent;
  let fixture: ComponentFixture<UserLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
