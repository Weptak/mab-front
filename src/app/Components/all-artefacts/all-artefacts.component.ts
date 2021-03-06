import { Component, OnInit } from '@angular/core';
import { IArtefact } from 'src/app/domain/iartefact';
import { ArtefactService } from 'src/app/services/artefact.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-all-artefacts',
  templateUrl: './all-artefacts.component.html',
  styleUrls: ['./all-artefacts.component.scss'],
})
export class AllArtefactsComponent implements OnInit {
  sizeOptions: number[] = [10, 25, 50];
  totalElements: number = 0;
  page: number = 1;
  pageSize: number = 10;

  artefacts: IArtefact[] = [];
  isConservateur: boolean = false;

  constructor(
    private _artefactService: ArtefactService,
    private _basketService: BasketService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadData(1, this.pageSize); //Initial page load
    this.isConservateur = this.getJwtAuthority().includes('CONSERVATEUR');
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
    this._artefactService.getAllArtefacts(page - 1, size).subscribe(
      (resp) => {
        this.artefacts = resp['content'];
        this.totalElements = resp['totalElements'];
        this.pageSize = resp['size'];
      },
      (err) => console.log(`Error while loading the artefacts : ${err}`)
    );
  }

  sendToBasket(artefact: IArtefact) {
    this._basketService.addToBasket(artefact);
  }

  getJwtAuthority(): string {
    return this._authenticationService.getJwtAuthority();
  }
}
