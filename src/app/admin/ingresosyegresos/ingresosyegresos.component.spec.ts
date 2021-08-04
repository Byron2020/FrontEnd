import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosyegresosComponent } from './ingresosyegresos.component';

describe('IngresosyegresosComponent', () => {
  let component: IngresosyegresosComponent;
  let fixture: ComponentFixture<IngresosyegresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresosyegresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosyegresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
