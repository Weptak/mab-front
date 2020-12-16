import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChercheurGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authenticationService.getJwtAuthority().includes('CHERCHEUR')) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
