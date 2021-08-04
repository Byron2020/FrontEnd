import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIeComponent } from './show-ie.component';

describe('ShowIeComponent', () => {
  let component: ShowIeComponent;
  let fixture: ComponentFixture<ShowIeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
