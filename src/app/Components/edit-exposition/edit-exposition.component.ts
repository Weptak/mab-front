import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IExposition } from 'src/app/domain/iexposition';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-edit-exposition',
  templateUrl: './edit-exposition.component.html',
  styleUrls: ['./edit-exposition.component.scss'],
})
export class EditExpositionComponent implements OnInit {
  exposition: IExposition;
  expoID: string;
  form: FormGroup;

  constructor(
    private _expositionService: ExpositionService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((resp) => {
      this.expoID = resp.get('id');
      this._expositionService.getExpoById(+this.expoID).subscribe(
        (res) => {
          this.exposition = res;
          this.form = this._formBuilder.group({
            id: new FormControl(this.exposition.id, Validators.required),
            title: new FormControl(this.exposition.title, Validators.required),
            description: new FormControl(this.exposition.description),
            startDate: new FormControl(this.exposition.startDate),
            endDate: new FormControl(this.exposition.endDate),
            imageUrl: new FormControl(this.exposition.imageUrl),
            visitorCount: new FormControl(this.exposition.visitorCount),
          });
        },
        (err) => console.log('Error retrieving the exposition ' + err)
      );
    });
  }

  public editExposition(exposition: IExposition) {
    this._expositionService.editExpo(exposition).subscribe((resp) => {
      console.log('Exposition updated ' + exposition.title);
      this._router.navigate(['/expos']);
    });
  }
}
