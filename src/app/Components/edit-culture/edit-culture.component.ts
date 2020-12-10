import { Component, OnInit } from '@angular/core';
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
  isValid: boolean = true;

  constructor(
    private _cultureService: CultureService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((resp) => {
      this.cultureID = resp.get('id');
      this._cultureService.getCultureById(+this.cultureID).subscribe(
        (res) => (this.culture = res),
        (err) => console.log('Error retrieving the culture : ' + err)
      );
    });
  }

  check() {
    if (this.culture.name != null && this.culture.name != '') {
      this.isValid = true;
    }
  }

  public editCulture(culture: ICulture) {
    if (culture.name != null && culture.name != '') {
      this._cultureService.editCulture(culture).subscribe((resp) => {
        console.log('Culture update ' + culture.name);
        this._router.navigate(['/collections/' + this.cultureID]);
      });
    } else {
      this.isValid = false;
    }
  }
  public back() {
    this._router.navigate(['/collections/' + this.cultureID]);
  }
}
