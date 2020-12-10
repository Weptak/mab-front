import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtefact } from 'src/app/domain/iartefact';
import { ArtefactService } from 'src/app/services/artefact.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artefact-details',
  templateUrl: './artefact-details.component.html',
  styleUrls: ['./artefact-details.component.scss'],
})
export class ArtefactDetailsComponent implements OnInit {
  artefact: IArtefact;
  identification: string;

  constructor(
    private _artefactService: ArtefactService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _modalService: NgbModal,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res) => {
      this.identification = res.get('identification');
      this._artefactService
        .getArtefactDetails(this.identification)
        .subscribe((resp) => (this.artefact = resp));
    });
  }

  back() {
    this._location.back();
  }

  open(supprimerArtefact) {
    this._modalService
      .open(supprimerArtefact, { centered: true })
      .result.then((result) => {
        this.modalResult(result);
      });
  }

  private modalResult(result: any) {
    if (result === 'deleteArtefact') {
      this.deleteArtefact(this.artefact.identification);
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
}
