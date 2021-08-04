import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibdiarioComponent } from './libdiario.component';

describe('LibdiarioComponent', () => {
  let component: LibdiarioComponent;
  let fixture: ComponentFixture<LibdiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibdiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibdiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
