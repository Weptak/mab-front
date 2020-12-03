import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArtefactsComponent } from './all-artefacts.component';

describe('AllArtefactsComponent', () => {
  let component: AllArtefactsComponent;
  let fixture: ComponentFixture<AllArtefactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArtefactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArtefactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
