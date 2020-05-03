import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriImpuestoTarifaComponent } from './sri-impuesto-tarifa.component';

describe('SriImpuestoTarifaComponent', () => {
  let component: SriImpuestoTarifaComponent;
  let fixture: ComponentFixture<SriImpuestoTarifaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriImpuestoTarifaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriImpuestoTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
