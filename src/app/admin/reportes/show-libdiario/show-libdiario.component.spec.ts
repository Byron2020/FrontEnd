import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLibdiarioComponent } from './show-libdiario.component';

describe('ShowLibdiarioComponent', () => {
  let component: ShowLibdiarioComponent;
  let fixture: ComponentFixture<ShowLibdiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLibdiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLibdiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
