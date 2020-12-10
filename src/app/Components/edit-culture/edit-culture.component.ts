import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICulture } from 'src/app/domain/iculture';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-edit-culture',
  templateUrl: './edit-culture.component.html',
  styleUrls: ['./edit-culture.component.scss'],
})
export class EditCultureComponent implements OnInit {
  culture: ICulture;
  cultureID: string;
  form: FormGroup;

  constructor(
    private _cultureService: CultureService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((resp) => {
      this.cultureID = resp.get('id');
      this._cultureService.getCultureById(+this.cultureID).subscribe(
        (res) => {
          this.culture = res;
          this.form = this._formBuilder.group({
            id: new FormControl(this.culture.id, Validators.required),
            name: new FormControl(this.culture.name, Validators.required),
            description: new FormControl(this.culture.description),
            periodDescription: new FormControl(this.culture.periodDescription),
            cultureMap: new FormControl(this.culture.cultureMap),
            startYear: new FormControl(this.culture.startYear),
            endYear: new FormControl(this.culture.endYear),
          });
        },
        (err) => console.log('Error retrieving the culture : ' + err)
      );
    });
  }

  public editCulture(culture: ICulture) {
    this._cultureService.editCulture(culture).subscribe((resp) => {
      console.log('Culture update ' + culture.name);
      this._router.navigate(['/collections/' + this.cultureID]).then(() => {
        window.location.reload();
      });
    });
  }
  public back() {
    this._router.navigate(['/collections/' + this.cultureID]);
  }
}
