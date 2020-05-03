import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriErroresInstitucionControlComponent } from './sri-errores-institucion-control.component';

describe('SriErroresInstitucionControlComponent', () => {
  let component: SriErroresInstitucionControlComponent;
  let fixture: ComponentFixture<SriErroresInstitucionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriErroresInstitucionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriErroresInstitucionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
