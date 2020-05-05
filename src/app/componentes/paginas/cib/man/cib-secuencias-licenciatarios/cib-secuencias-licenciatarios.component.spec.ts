import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibSecuenciasLicenciatariosComponent } from './cib-secuencias-licenciatarios.component';

describe('CibSecuenciasLicenciatariosComponent', () => {
  let component: CibSecuenciasLicenciatariosComponent;
  let fixture: ComponentFixture<CibSecuenciasLicenciatariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibSecuenciasLicenciatariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibSecuenciasLicenciatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
