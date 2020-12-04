import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArtefact } from 'src/app/domain/iartefact';
import { ICulture } from 'src/app/domain/iculture';
import { ArtefactService } from 'src/app/services/artefact.service';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-artefacts-from-culture',
  templateUrl: './artefacts-from-culture.component.html',
  styleUrls: ['./artefacts-from-culture.component.scss'],
})
export class ArtefactsFromCultureComponent implements OnInit {
  sizeOptions: number[] = [10, 25, 50];
  totalElements: number = 0;
  page: number = 1;
  pageSize: number = 10;

  culture: ICulture;
  artefacts: IArtefact[] = [];

  constructor(
    private _cultureService: CultureService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData(1, this.pageSize); //Initial page load
  }

  // Event handler for page change
  loadPageFromServer(pageToLoad: number) {
    this.loadData(pageToLoad, this.pageSize);
  }

  selectPageSize(event) {
    this.pageSize = event.target.value;
    this.loadData(1, this.pageSize);
  }

  // Retrieve the content of a page from the server
  loadData(page: number, size: number): void {
    this._route.paramMap.subscribe((res) => {
      let id: number = +res.get('id');
      this._cultureService.getCultureById(id).subscribe(
        (re) => (this.culture = re),
        (err) => console.log(`Error retrieving the culture : ` + err)
      );
      this._cultureService
        .getArtefactsFromCultureId(id, page - 1, size)
        .subscribe(
          (resp) => {
            this.artefacts = resp['content'];
            this.totalElements = resp['totalElements'];
            this.pageSize = resp['size'];
          },
          (err) => console.log(`Error while loading the artefacts : ${err}`)
        );
    });
  }
}
