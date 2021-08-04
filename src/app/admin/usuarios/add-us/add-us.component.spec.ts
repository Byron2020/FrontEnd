import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsComponent } from './add-us.component';

describe('AddUsComponent', () => {
  let component: AddUsComponent;
  let fixture: ComponentFixture<AddUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
