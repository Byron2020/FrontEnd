import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsComponent } from './perfil-us.component';

describe('PerfilUsComponent', () => {
  let component: PerfilUsComponent;
  let fixture: ComponentFixture<PerfilUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
