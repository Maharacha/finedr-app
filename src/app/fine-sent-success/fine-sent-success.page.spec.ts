import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FineSentSuccessPage } from './fine-sent-success.page';

describe('FineSentSuccessPage', () => {
  let component: FineSentSuccessPage;
  let fixture: ComponentFixture<FineSentSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FineSentSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineSentSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
