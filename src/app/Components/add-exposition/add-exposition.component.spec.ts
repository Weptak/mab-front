import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpositionComponent } from './add-exposition.component';

describe('AddExpositionComponent', () => {
  let component: AddExpositionComponent;
  let fixture: ComponentFixture<AddExpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
