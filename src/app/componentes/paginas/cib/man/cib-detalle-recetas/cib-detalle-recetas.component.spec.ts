import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibDetalleRecetasComponent } from './cib-detalle-recetas.component';

describe('CibDetalleRecetasComponent', () => {
  let component: CibDetalleRecetasComponent;
  let fixture: ComponentFixture<CibDetalleRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibDetalleRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibDetalleRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
