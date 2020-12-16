import { Component, OnInit } from '@angular/core';
import { ICulture } from 'src/app/domain/iculture';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CultureService } from 'src/app/services/culture.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  cultures: ICulture[];
  isChercheur: boolean = false;

  constructor(
    private _culturesService: CultureService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._culturesService.getAllCultures().subscribe(
      (resp) => (this.cultures = resp),
      (err) => console.log(`Error loading cultures"+err`)
    );
    this.isChercheur = this.getJwtAuthority().includes('CHERCHEUR');
  }
  getJwtAuthority(): string {
    return this._authenticationService.getJwtAuthority();
  }
}
