import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriTipoComprobanteComponent } from './sri-tipo-comprobante.component';

describe('SriTipoComprobanteComponent', () => {
  let component: SriTipoComprobanteComponent;
  let fixture: ComponentFixture<SriTipoComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriTipoComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriTipoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
