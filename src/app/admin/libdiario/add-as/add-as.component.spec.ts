import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsComponent } from './add-as.component';

describe('AddAsComponent', () => {
  let component: AddAsComponent;
  let fixture: ComponentFixture<AddAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
