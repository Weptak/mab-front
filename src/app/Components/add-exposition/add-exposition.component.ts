import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IExposition } from 'src/app/domain/iexposition';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-add-exposition',
  templateUrl: './add-exposition.component.html',
  styleUrls: ['./add-exposition.component.scss'],
})
export class AddExpositionComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _expositionService: ExpositionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: new FormControl(null),
      title: new FormControl(),
      description: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      imageUrl: new FormControl(),
    });
  }

  addExpo(exposition: IExposition) {
    this._expositionService.addExpo(exposition).subscribe((res) => {
      console.log('Exposition successfully added : ' + exposition.title);
      this._router.navigate(['/expos']);
    });
  }
}
