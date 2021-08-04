import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibComponent } from './detalle-lib.component';

describe('DetalleLibComponent', () => {
  let component: DetalleLibComponent;
  let fixture: ComponentFixture<DetalleLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
