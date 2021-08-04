import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIeComponent } from './add-ie.component';

describe('AddIeComponent', () => {
  let component: AddIeComponent;
  let fixture: ComponentFixture<AddIeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
