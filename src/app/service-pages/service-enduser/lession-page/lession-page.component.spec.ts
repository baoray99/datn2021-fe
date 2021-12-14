import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionPageComponent } from './lession-page.component';

describe('LessionPageComponent', () => {
  let component: LessionPageComponent;
  let fixture: ComponentFixture<LessionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
