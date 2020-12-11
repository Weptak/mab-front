import { Component, OnInit } from '@angular/core';
import { IArtefact } from 'src/app/domain/iartefact';
import { IExposition } from 'src/app/domain/iexposition';
import { BasketService } from 'src/app/services/basket.service';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  itemsToExpose: IArtefact[] = [];
  expositions: IExposition[];
  selectedExposition: IExposition;

  constructor(
    private _basket: BasketService,
    private _expositionService: ExpositionService
  ) {}

  ngOnInit(): void {
    this._expositionService.getAllCurrentExpos(0, 50).subscribe(
      (resp) => {
        this.expositions = resp['content'];
        this.itemsToExpose = this._basket.getBasketItems();
      },
      (err) => console.log('Error retrieving the expositions ' + err)
    );
  }

  resetBasket() {
    this._basket.resetBasket();
    this.ngOnInit();
  }

  retirer(artefact: IArtefact) {
    this._basket.removeFromBasket(artefact);
    this.ngOnInit();
  }

  sendToExpo() {
    let artefactIdList: string[] = [];
    this.itemsToExpose.forEach((element) => {
      artefactIdList.push(element.identification);
    });
    console.log('Items in the array : ' + artefactIdList);
    this._expositionService
      .addArtefacts(this.selectedExposition.id, artefactIdList)
      .subscribe(
        (resp) => {
          this._basket.resetBasket();
          this.ngOnInit();
        },
        (err) => console.log('An error occured in adding Artefacts' + err)
      );
  }
}
