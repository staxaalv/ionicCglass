import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibEquivalenciasUnidadesMedidasComponent } from './cib-equivalencias-unidades-medidas.component';

describe('CibEquivalenciasUnidadesMedidasComponent', () => {
  let component: CibEquivalenciasUnidadesMedidasComponent;
  let fixture: ComponentFixture<CibEquivalenciasUnidadesMedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibEquivalenciasUnidadesMedidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibEquivalenciasUnidadesMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
