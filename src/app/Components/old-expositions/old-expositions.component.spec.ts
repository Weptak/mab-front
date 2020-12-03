import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldExpositionsComponent } from './old-expositions.component';

describe('OldExpositionsComponent', () => {
  let component: OldExpositionsComponent;
  let fixture: ComponentFixture<OldExpositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldExpositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldExpositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
