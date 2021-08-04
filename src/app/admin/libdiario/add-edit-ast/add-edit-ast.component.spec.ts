import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAstComponent } from './add-edit-ast.component';

describe('AddEditAstComponent', () => {
  let component: AddEditAstComponent;
  let fixture: ComponentFixture<AddEditAstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
