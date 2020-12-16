import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExposition } from 'src/app/domain/iexposition';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExpositionService } from 'src/app/services/exposition.service';

@Component({
  selector: 'app-expositions',
  templateUrl: './expositions.component.html',
  styleUrls: ['./expositions.component.scss'],
})
export class ExpositionsComponent implements OnInit {
  expositions: IExposition[];
  exposition: IExposition;
  form: FormGroup;
  isConservateur: boolean = false;

  constructor(
    private _expoService: ExpositionService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._expoService.getAllCurrentExpos(0, 50).subscribe(
      (resp) => (this.expositions = resp['content']),
      (err) => console.log(`An error occured retrieving expos ` + err)
    );
    this.form = this._formBuilder.group({
      visitorsToAdd: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]{0,1}$'),
      ]),
    });
    this.isConservateur = this._authenticationService
      .getJwtAuthority()
      .includes('CONSERVATEUR');
  }
  open(modal, expo: IExposition) {
    this.exposition = expo;
    this._modalService.open(modal, { centered: true }).result.then((result) => {
      this.modalResult(result);
    });
  }

  private modalResult(result: any) {
    switch (result) {
      case 'addVisitors': {
        this.addVisitors();
        console.log(
          'call to add visitors to exposition ' + this.exposition.title
        );
        break;
      }
      case 'closeExpo': {
        this.closeExposition();
        console.log('call to close exposition ' + this.exposition.title);
        break;
      }
      case 'deleteExpo': {
        this.deleteExpo();
        console.log('call to delete exposition ' + this.exposition.title);
        break;
      }
    }
  }

  private addVisitors() {
    let visitorsToAdd = this.form.value.visitorsToAdd;
    this._expoService
      .addVisitor(this.exposition.id, visitorsToAdd)
      .subscribe((resp) => {
        console.log(
          visitorsToAdd + ' visitors added to expo ' + this.exposition.title
        );
      });
  }

  private closeExposition() {
    this._expoService.endExpo(this.exposition.id).subscribe(
      (resp) =>
        console.log(
          'The exposition ' + this.exposition.title + ' has been closed'
        ),
      (err) =>
        console.log('Error closing the exposition ' + this.exposition.title)
    );
  }

  private deleteExpo() {
    this.closeExposition();
    this._expoService.deleteExpo(this.exposition.id).subscribe(
      (resp) => {
        console.log(
          'The exposition ' + this.exposition.title + ' has been deleted'
        );
        this.ngOnInit();
      },
      (err) =>
        console.log('Error deleting the exposition ' + this.exposition.title)
    );
  }
}
