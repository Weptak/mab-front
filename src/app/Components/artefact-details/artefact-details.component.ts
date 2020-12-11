import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtefact } from 'src/app/domain/iartefact';
import { ArtefactService } from 'src/app/services/artefact.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-artefact-details',
  templateUrl: './artefact-details.component.html',
  styleUrls: ['./artefact-details.component.scss'],
})
export class ArtefactDetailsComponent implements OnInit {
  artefact: IArtefact;
  identification: string;
  room: string = null;

  constructor(
    private _artefactService: ArtefactService,
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _router: Router,
    private _basketService: BasketService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res) => {
      this.identification = res.get('identification');
      this._artefactService
        .getArtefactDetails(this.identification)
        .subscribe((resp) => (this.artefact = resp));
    });
  }

  open(modal) {
    this._modalService.open(modal, { centered: true }).result.then((result) => {
      this.modalResult(result);
    });
  }

  private modalResult(result: any) {
    switch (result) {
      case 'deleteArtefact': {
        this.deleteArtefact(this.artefact.identification);
        break;
      }
      case 'moveArtefact': {
        this.moveArtefact(this.room);
        break;
      }
      case 'moveToReserves': {
        this.moveArtefact('reserves');
        break;
      }
    }
  }

  private deleteArtefact(id: string) {
    this._artefactService.deleteArtefact(id).subscribe(
      (resp) => {
        console.log('Artefact ' + this.artefact.name + ' has been deleted');
        this._router.navigate(['/collections']).then(() => {
          window.location.reload();
        });
      },
      (err) => console.log('Error deleting artefact : ' + this.artefact.name)
    );
  }

  private moveArtefact(room: string) {
    this._artefactService
      .changeLocation(this.artefact.identification, room)
      .subscribe(
        (resp) => {
          console.log(this.artefact.name + ' moved to ' + room);
          window.location.reload();
        },
        (err) => console.log('Error moving artefact to ' + room)
      );
  }

  sendToBasket() {
    this._basketService.addToBasket(this.artefact);
  }
}
