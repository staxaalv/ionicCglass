import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibCabeceraMovimientoComponent } from './cib-cabecera-movimiento.component';

describe('CibCabeceraMovimientoComponent', () => {
  let component: CibCabeceraMovimientoComponent;
  let fixture: ComponentFixture<CibCabeceraMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibCabeceraMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibCabeceraMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
