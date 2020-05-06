import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibDetalleMovimientoComponent } from './cib-detalle-movimiento.component';

describe('CibDetalleMovimientoComponent', () => {
  let component: CibDetalleMovimientoComponent;
  let fixture: ComponentFixture<CibDetalleMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibDetalleMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibDetalleMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
