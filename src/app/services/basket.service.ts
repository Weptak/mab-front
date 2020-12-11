import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IArtefact } from '../domain/iartefact';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  itemsToExpose: IArtefact[] = [];
  private messageSource = new BehaviorSubject(0);
  currentBasketLength = this.messageSource.asObservable();

  constructor() {}

  addToBasket(artefact: IArtefact) {
    const found = this.itemsToExpose.some(
      (item) => item.identification === artefact.identification
    );
    if (!found) {
      this.itemsToExpose.push(artefact);
      this.messageSource.next(this.itemsToExpose.length);
    }
  }

  removeFromBasket(artefact: IArtefact) {
    this.itemsToExpose = this.itemsToExpose.filter((item) => item !== artefact);
    this.messageSource.next(this.itemsToExpose.length);
  }

  getBasketItems(): IArtefact[] {
    return this.itemsToExpose;
  }

  getBasketLength(): number {
    return this.itemsToExpose.length;
  }

  resetBasket() {
    this.itemsToExpose = [];
    this.messageSource.next(this.itemsToExpose.length);
  }
}
