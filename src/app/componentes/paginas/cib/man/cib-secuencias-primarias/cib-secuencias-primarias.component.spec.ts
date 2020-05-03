import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibSecuenciasPrimariasComponent } from './cib-secuencias-primarias.component';

describe('CibSecuenciasPrimariasComponent', () => {
  let component: CibSecuenciasPrimariasComponent;
  let fixture: ComponentFixture<CibSecuenciasPrimariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibSecuenciasPrimariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibSecuenciasPrimariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
