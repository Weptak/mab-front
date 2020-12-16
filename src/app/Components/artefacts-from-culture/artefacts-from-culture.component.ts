import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IArtefact } from 'src/app/domain/iartefact';
import { ICulture } from 'src/app/domain/iculture';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasketService } from 'src/app/services/basket.service';
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
  isChercheur: boolean = false;
  isConservateur: boolean = false;

  culture: ICulture;
  artefacts: IArtefact[] = [];

  constructor(
    private _cultureService: CultureService,
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _router: Router,
    private _basketService: BasketService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadData(1, this.pageSize); //Initial page load
    this.isChercheur = this.getJwtAuthority().includes('CHERCHEUR');
    this.isConservateur = this.getJwtAuthority().includes('CONSERVATEUR');
  }

  open(supprimer) {
    this._modalService
      .open(supprimer, { centered: true })
      .result.then((result) => {
        this.modalResult(result);
      });
  }

  private modalResult(result: any) {
    if (result === 'yes') {
      this.deleteCulture(this.culture.id);
    }
  }

  private deleteCulture(id: number) {
    this._cultureService.deleteCulture(id).subscribe(
      (resp) => {
        console.log('Culture ' + this.culture.name + ' has been deleted');
        this._router.navigate(['/collections']).then(() => {
          window.location.reload();
        });
      },
      (err) => console.log('Error deleting culture : ' + this.culture.name)
    );
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

  sendToBasket(artefact: IArtefact) {
    this._basketService.addToBasket(artefact);
  }

  getJwtAuthority(): string {
    return this._authenticationService.getJwtAuthority();
  }
}
