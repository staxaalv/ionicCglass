import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriSecuenciaPrimariaComponent } from './sri-secuencia-primaria.component';

describe('SriSecuenciaPrimariaComponent', () => {
  let component: SriSecuenciaPrimariaComponent;
  let fixture: ComponentFixture<SriSecuenciaPrimariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriSecuenciaPrimariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriSecuenciaPrimariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
