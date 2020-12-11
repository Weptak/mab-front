import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  basketLength: number = 0;

  constructor(private _basketService: BasketService) {}

  ngOnInit(): void {
    this._basketService.currentBasketLength.subscribe(
      (resp) => (this.basketLength = resp)
    );
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
