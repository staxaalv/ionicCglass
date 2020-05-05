import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibSubLineasComponent } from './cib-sub-lineas.component';

describe('CibSubLineasComponent', () => {
  let component: CibSubLineasComponent;
  let fixture: ComponentFixture<CibSubLineasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibSubLineasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibSubLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
