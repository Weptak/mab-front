import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICulture } from 'src/app/domain/iculture';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-add-culture',
  templateUrl: './add-culture.component.html',
  styleUrls: ['./add-culture.component.scss'],
})
export class AddCultureComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cultureService: CultureService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      periodDescription: new FormControl(''),
      cultureMap: new FormControl(null),
      startYear: new FormControl(Validators.pattern('^[-+]?d*$')),
      endYear: new FormControl(Validators.pattern('^[-+]?d*$')),
    });
  }

  addCulture(culture: ICulture) {
    this._cultureService.addCulture(culture).subscribe((res) => {
      console.log('Culture successfully added : ' + culture.name);
      this._router.navigate(['/collections']);
    });
  }
}
