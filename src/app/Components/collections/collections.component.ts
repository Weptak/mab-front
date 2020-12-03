import { Component, OnInit } from '@angular/core';
import { ICulture } from 'src/app/domain/iculture';
import { ArtefactService } from 'src/app/services/artefact.service';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  cultures: ICulture[];

  constructor(private _culturesService: CultureService) {}

  ngOnInit(): void {
    this._culturesService.getAllCultures().subscribe(
      (resp) => (this.cultures = resp),
      (err) => console.log(`Error loading cultures"+err`)
    );
  }
}
