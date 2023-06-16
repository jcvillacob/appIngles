import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaTextoComponent } from './lectura-texto.component';

describe('LecturaTextoComponent', () => {
  let component: LecturaTextoComponent;
  let fixture: ComponentFixture<LecturaTextoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturaTextoComponent]
    });
    fixture = TestBed.createComponent(LecturaTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
