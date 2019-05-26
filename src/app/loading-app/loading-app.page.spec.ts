import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAppPage } from './loading-app.page';

describe('LoadingAppPage', () => {
  let component: LoadingAppPage;
  let fixture: ComponentFixture<LoadingAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
