import { Component, OnInit } from '@angular/core';
import { IExposition } from 'src/app/domain/iexposition';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-old-expositions',
  templateUrl: './old-expositions.component.html',
  styleUrls: ['./old-expositions.component.scss'],
})
export class OldExpositionsComponent implements OnInit {
  oldExpositions: IExposition[];
  constructor(private _expoService: ExpositionService) {}

  ngOnInit(): void {
    this._expoService.getOldExpos(0, 50).subscribe(
      (resp) => (this.oldExpositions = resp.content),
      (err) => console.log(`An error occured retrieving expos ` + err)
    );
  }
}
