import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IArtefact } from 'src/app/domain/iartefact';
import { ICulture } from 'src/app/domain/iculture';
import { ArtefactService } from 'src/app/services/artefact.service';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-add-artefact',
  templateUrl: './add-artefact.component.html',
  styleUrls: ['./add-artefact.component.scss'],
})
export class AddArtefactComponent implements OnInit {
  form: FormGroup;
  cultures: ICulture[];
  cultureId: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _artefactService: ArtefactService,
    private _cultureService: CultureService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cultureService.getAllCultures().subscribe(
      (resp) => (this.cultures = resp),
      (err) => console.log('Error retrieving cultures : ' + err)
    );
    this.form = this._formBuilder.group({
      identification: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      objectDescription: new FormControl(''),
      periodDescription: new FormControl(''),
      culturalPhase: new FormControl(null),
      type: new FormControl(''),
      material: new FormControl(''),
      localisation: new FormControl('In reserves', Validators.required),
      imageURL: new FormControl(''),
      onPermanentDisplay: new FormControl(false),
      inExposition: new FormControl(false),
      dateOfEntry: new FormControl(Validators.required),
      startYear: new FormControl(Validators.pattern('^[-+]?d*$')),
      endYear: new FormControl(Validators.pattern('^[-+]?d*$')),
      culture: new FormControl(),
    });
  }

  addArtefact(artefact: IArtefact) {
    this._artefactService.addArtefact(artefact).subscribe((res) => {
      console.log('Artefact successfully added : ' + artefact);
      this._router.navigate([
        '/collections/details/' + artefact.identification,
      ]);
    });
  }
  onChange(value) {
    console.log(value);
  }
}
