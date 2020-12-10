import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtefactComponent } from './edit-artefact.component';

describe('EditArtefactComponent', () => {
  let component: EditArtefactComponent;
  let fixture: ComponentFixture<EditArtefactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArtefactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArtefactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
