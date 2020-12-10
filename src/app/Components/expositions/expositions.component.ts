import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExposition } from 'src/app/domain/iexposition';
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

  constructor(
    private _expoService: ExpositionService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
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
}
