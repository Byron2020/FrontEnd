import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepLibdiarioComponent } from './show-rep-libdiario.component';

describe('ShowRepLibdiarioComponent', () => {
  let component: ShowRepLibdiarioComponent;
  let fixture: ComponentFixture<ShowRepLibdiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRepLibdiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRepLibdiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
