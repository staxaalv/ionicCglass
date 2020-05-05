import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibProductosComponent } from './cib-productos.component';

describe('CibProductosComponent', () => {
  let component: CibProductosComponent;
  let fixture: ComponentFixture<CibProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
