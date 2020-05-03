import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriClaseContribuyenteRtfComponent } from './sri-clase-contribuyente-rtf.component';

describe('SriClaseContribuyenteRtfComponent', () => {
  let component: SriClaseContribuyenteRtfComponent;
  let fixture: ComponentFixture<SriClaseContribuyenteRtfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriClaseContribuyenteRtfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriClaseContribuyenteRtfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
