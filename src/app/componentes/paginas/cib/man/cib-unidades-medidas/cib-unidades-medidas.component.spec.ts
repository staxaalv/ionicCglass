import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibUnidadesMedidasComponent } from './cib-unidades-medidas.component';

describe('CibUnidadesMedidasComponent', () => {
  let component: CibUnidadesMedidasComponent;
  let fixture: ComponentFixture<CibUnidadesMedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibUnidadesMedidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibUnidadesMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
