import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibSucursalesInventarioComponent } from './cib-sucursales-inventario.component';

describe('CibSucursalesInventarioComponent', () => {
  let component: CibSucursalesInventarioComponent;
  let fixture: ComponentFixture<CibSucursalesInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibSucursalesInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibSucursalesInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
