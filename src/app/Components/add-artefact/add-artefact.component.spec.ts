import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtefactComponent } from './add-artefact.component';

describe('AddArtefactComponent', () => {
  let component: AddArtefactComponent;
  let fixture: ComponentFixture<AddArtefactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArtefactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtefactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
