import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriRetencionFuenteComponent } from './sri-retencion-fuente.component';

describe('SriRetencionFuenteComponent', () => {
  let component: SriRetencionFuenteComponent;
  let fixture: ComponentFixture<SriRetencionFuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriRetencionFuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriRetencionFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
