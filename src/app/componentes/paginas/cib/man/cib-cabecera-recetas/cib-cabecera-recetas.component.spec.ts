import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibCabeceraRecetasComponent } from './cib-cabecera-recetas.component';

describe('CibCabeceraRecetasComponent', () => {
  let component: CibCabeceraRecetasComponent;
  let fixture: ComponentFixture<CibCabeceraRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibCabeceraRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibCabeceraRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
