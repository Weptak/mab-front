import { Component, OnInit } from '@angular/core';
import { IExposition } from 'src/app/domain/iexposition';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  currentExpos: IExposition[];

  constructor(private _expoService: ExpositionService) {}

  ngOnInit(): void {
    this._expoService.getAllCurrentExpos(0, 3).subscribe(
      (resp) => {
        this.currentExpos = resp.content;
      },
      (err) => console.log(`Error retrieving current expositions : ${err}`)
    );
  }
}
