import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditScComponent } from './add-edit-sc.component';

describe('AddEditScComponent', () => {
  let component: AddEditScComponent;
  let fixture: ComponentFixture<AddEditScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
