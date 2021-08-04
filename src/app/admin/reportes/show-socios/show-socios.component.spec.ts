import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSociosComponent } from './show-socios.component';

describe('ShowSociosComponent', () => {
  let component: ShowSociosComponent;
  let fixture: ComponentFixture<ShowSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
