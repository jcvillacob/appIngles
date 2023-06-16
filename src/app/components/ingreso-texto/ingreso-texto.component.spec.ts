import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoTextoComponent } from './ingreso-texto.component';

describe('IngresoTextoComponent', () => {
  let component: IngresoTextoComponent;
  let fixture: ComponentFixture<IngresoTextoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoTextoComponent]
    });
    fixture = TestBed.createComponent(IngresoTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
