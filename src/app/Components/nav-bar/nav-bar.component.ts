import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  basketLength: number = 0;

  constructor(
    private _basketService: BasketService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._basketService.currentBasketLength.subscribe(
      (resp) => (this.basketLength = resp)
    );
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  isLoggedIn(): boolean {
    return this._authenticationService.isLoggedIn();
  }

  getJwtSubjet(): string {
    return this._authenticationService.getJwtSubjet();
  }
}
