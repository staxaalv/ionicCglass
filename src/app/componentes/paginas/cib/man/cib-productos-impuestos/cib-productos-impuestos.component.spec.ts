import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibProductosImpuestosComponent } from './cib-productos-impuestos.component';

describe('CibProductosImpuestosComponent', () => {
  let component: CibProductosImpuestosComponent;
  let fixture: ComponentFixture<CibProductosImpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibProductosImpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibProductosImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
