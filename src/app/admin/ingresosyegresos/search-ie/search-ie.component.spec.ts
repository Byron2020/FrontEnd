import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIeComponent } from './search-ie.component';

describe('SearchIeComponent', () => {
  let component: SearchIeComponent;
  let fixture: ComponentFixture<SearchIeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
