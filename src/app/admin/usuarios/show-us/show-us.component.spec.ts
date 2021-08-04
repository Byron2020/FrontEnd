import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsComponent } from './show-us.component';

describe('ShowUsComponent', () => {
  let component: ShowUsComponent;
  let fixture: ComponentFixture<ShowUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
