import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeFormaPagoInstituFinanComponent } from './age-forma-pago-institu-finan.component';

describe('AgeFormaPagoInstituFinanComponent', () => {
  let component: AgeFormaPagoInstituFinanComponent;
  let fixture: ComponentFixture<AgeFormaPagoInstituFinanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeFormaPagoInstituFinanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeFormaPagoInstituFinanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
