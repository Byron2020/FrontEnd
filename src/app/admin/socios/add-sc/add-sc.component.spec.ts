import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScComponent } from './add-sc.component';

describe('AddScComponent', () => {
  let component: AddScComponent;
  let fixture: ComponentFixture<AddScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
