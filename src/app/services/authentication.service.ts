import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  url_authentication = 'http://localhost:8080/login';

  login(username: string, password: string) {
    return this.http
      .post<any>(this.url_authentication, {
        username: username,
        password: password,
      })
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ username, token: res.token })
            );
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') ? true : false;
  }

  getJwtSubjet(): string {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const helper = new JwtHelperService();
      return helper.decodeToken(JSON.parse(stored).token).authority;
    }
    return null;
  }
}
