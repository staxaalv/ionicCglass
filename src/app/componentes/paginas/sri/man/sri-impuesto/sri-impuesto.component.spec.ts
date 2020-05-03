import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriImpuestoComponent } from './sri-impuesto.component';

describe('SriImpuestoComponent', () => {
  let component: SriImpuestoComponent;
  let fixture: ComponentFixture<SriImpuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriImpuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
