import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtefact } from 'src/app/domain/iartefact';
import { ArtefactService } from 'src/app/services/artefact.service';

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
}
