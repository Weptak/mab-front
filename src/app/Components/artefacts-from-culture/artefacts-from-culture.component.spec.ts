import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefactsFromCultureComponent } from './artefacts-from-culture.component';

describe('ArtefactsFromCultureComponent', () => {
  let component: ArtefactsFromCultureComponent;
  let fixture: ComponentFixture<ArtefactsFromCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtefactsFromCultureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefactsFromCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
