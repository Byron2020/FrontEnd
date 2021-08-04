import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUsComponent } from './add-edit-us.component';

describe('AddEditUsComponent', () => {
  let component: AddEditUsComponent;
  let fixture: ComponentFixture<AddEditUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
