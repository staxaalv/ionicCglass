import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibLineasComponent } from './cib-lineas.component';

describe('CibLineasComponent', () => {
  let component: CibLineasComponent;
  let fixture: ComponentFixture<CibLineasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibLineasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
