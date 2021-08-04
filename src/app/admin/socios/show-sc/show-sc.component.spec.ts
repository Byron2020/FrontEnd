import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowScComponent } from './show-sc.component';

describe('ShowScComponent', () => {
  let component: ShowScComponent;
  let fixture: ComponentFixture<ShowScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
