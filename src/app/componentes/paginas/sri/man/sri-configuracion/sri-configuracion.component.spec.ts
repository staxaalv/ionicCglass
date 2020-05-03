import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriConfiguracionComponent } from './sri-configuracion.component';

describe('SriConfiguracionComponent', () => {
  let component: SriConfiguracionComponent;
  let fixture: ComponentFixture<SriConfiguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriConfiguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
