import { Component, OnInit } from '@angular/core';
import { IExposition } from 'src/app/domain/iexposition';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-expositions',
  templateUrl: './expositions.component.html',
  styleUrls: ['./expositions.component.scss'],
})
export class ExpositionsComponent implements OnInit {
  expositions: IExposition[];
  constructor(private _expoService: ExpositionService) {}

  ngOnInit(): void {
    this._expoService.getAllCurrentExpos(0, 50).subscribe(
      (resp) => (this.expositions = resp.content),
      (err) => console.log(`An error occured retrieving expos ` + err)
    );
  }
}
