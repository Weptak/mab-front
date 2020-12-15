import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutResolver implements Resolve<any> {
  constructor(private _authenticationService: AuthenticationService) {}

  resolve() {
    if (localStorage.getItem('currentUser')) {
      this._authenticationService.logout();
    }
  }
}
