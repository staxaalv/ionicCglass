import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibMarcasComponent } from './cib-marcas.component';

describe('CibMarcasComponent', () => {
  let component: CibMarcasComponent;
  let fixture: ComponentFixture<CibMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
