import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtefact } from 'src/app/domain/iartefact';
import { ICulture } from 'src/app/domain/iculture';
import { ArtefactService } from 'src/app/services/artefact.service';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-edit-artefact',
  templateUrl: './edit-artefact.component.html',
  styleUrls: ['./edit-artefact.component.scss'],
})
export class EditArtefactComponent implements OnInit {
  artefact: IArtefact;
  form: FormGroup;
  cultures: ICulture[];
  identification: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _artefactService: ArtefactService,
    private _cultureService: CultureService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cultureService.getAllCultures().subscribe(
      (resp) => (this.cultures = resp),
      (err) => console.log('Error retrieving cultures : ' + err)
    );

    this._route.paramMap.subscribe((res) => {
      this.identification = res.get('identification');
      this._artefactService
        .getArtefactDetails(this.identification)
        .subscribe((resp) => {
          this.artefact = resp;
          this.form = this._formBuilder.group({
            identification: new FormControl(this.artefact.identification),
            name: new FormControl(this.artefact.name),
            objectDescription: new FormControl(this.artefact.objectDescription),
            periodDescription: new FormControl(this.artefact.periodDescription),
            culturalPhase: new FormControl(this.artefact.culturalPhase),
            type: new FormControl(this.artefact.type),
            material: new FormControl(this.artefact.material),
            localisation: new FormControl(this.artefact.localisation),
            imageURL: new FormControl(this.artefact.imageURL),
            onPermanentDisplay: new FormControl(
              this.artefact.onPermanentDisplay
            ),
            inExposition: new FormControl(this.artefact.inExposition),
            dateOfEntry: new FormControl(this.artefact.dateOfEntry),
            startYear: new FormControl(
              this.artefact.startYear,
              Validators.pattern('^[-+]?d*$')
            ),
            endYear: new FormControl(
              this.artefact.endYear,
              Validators.pattern('^[-+]?d*$')
            ),
            culture: new FormControl(this.artefact.culture),
          });
        });
    });
  }

  public editArtefact(artefact: IArtefact) {
    this._artefactService.editArtefact(artefact).subscribe((resp) => {
      console.log('Artefact updated ' + artefact.name);
      this._router.navigate([
        '/collections/details/' + artefact.identification,
      ]);
    });
  }
}
