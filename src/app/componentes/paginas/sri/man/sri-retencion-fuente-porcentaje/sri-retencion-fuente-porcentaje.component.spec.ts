import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriRetencionFuentePorcentajeComponent } from './sri-retencion-fuente-porcentaje.component';

describe('SriRetencionFuentePorcentajeComponent', () => {
  let component: SriRetencionFuentePorcentajeComponent;
  let fixture: ComponentFixture<SriRetencionFuentePorcentajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriRetencionFuentePorcentajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriRetencionFuentePorcentajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
