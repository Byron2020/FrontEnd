import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIeComponent } from './add-edit-ie.component';

describe('AddEditIeComponent', () => {
  let component: AddEditIeComponent;
  let fixture: ComponentFixture<AddEditIeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditIeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
