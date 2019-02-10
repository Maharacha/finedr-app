import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FineFormPage } from './fine-form.page';

describe('FineFormPage', () => {
  let component: FineFormPage;
  let fixture: ComponentFixture<FineFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FineFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
