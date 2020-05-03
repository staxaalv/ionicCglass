import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriPtoEmisionTipoComprobanteComponent } from './sri-pto-emision-tipo-comprobante.component';

describe('SriPtoEmisionTipoComprobanteComponent', () => {
  let component: SriPtoEmisionTipoComprobanteComponent;
  let fixture: ComponentFixture<SriPtoEmisionTipoComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriPtoEmisionTipoComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriPtoEmisionTipoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
