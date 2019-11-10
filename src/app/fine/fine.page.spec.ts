import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinePage } from './fine.page';

describe('FinePage', () => {
  let component: FinePage;
  let fixture: ComponentFixture<FinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
