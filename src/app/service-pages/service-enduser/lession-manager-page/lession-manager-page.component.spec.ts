import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionManagerPageComponent } from './lession-manager-page.component';

describe('LessionManagerPageComponent', () => {
  let component: LessionManagerPageComponent;
  let fixture: ComponentFixture<LessionManagerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessionManagerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessionManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
