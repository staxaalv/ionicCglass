import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibProductosAdicionalesComponent } from './cib-productos-adicionales.component';

describe('CibProductosAdicionalesComponent', () => {
  let component: CibProductosAdicionalesComponent;
  let fixture: ComponentFixture<CibProductosAdicionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibProductosAdicionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibProductosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
