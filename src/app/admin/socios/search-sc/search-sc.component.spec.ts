import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchScComponent } from './search-sc.component';

describe('SearchScComponent', () => {
  let component: SearchScComponent;
  let fixture: ComponentFixture<SearchScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
