import { Component, OnInit } from '@angular/core';
import { IExposition } from 'src/app/domain/iexposition';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-old-expositions',
  templateUrl: './old-expositions.component.html',
  styleUrls: ['./old-expositions.component.scss'],
})
export class OldExpositionsComponent implements OnInit {
  oldExpositions: IExposition[];
  isConservateur: boolean = false;
  constructor(
    private _expoService: ExpositionService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._expoService.getOldExpos(0, 50).subscribe(
      (resp) => (this.oldExpositions = resp['content']),
      (err) => console.log(`An error occured retrieving expos ` + err)
    );
    this.isConservateur = this._authenticationService
      .getJwtAuthority()
      .includes('CONSERVATEUR');
  }
}
