import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriTipoBienServicioComponent } from './sri-tipo-bien-servicio.component';

describe('SriTipoBienServicioComponent', () => {
  let component: SriTipoBienServicioComponent;
  let fixture: ComponentFixture<SriTipoBienServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriTipoBienServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriTipoBienServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
