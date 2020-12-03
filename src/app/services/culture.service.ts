import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICulture } from '../domain/iculture';

@Injectable({
  providedIn: 'root',
})
export class CultureService {
  private _url: string = environment.url + '/culture';

  constructor(private _http: HttpClient) {}

  public getAllCultures(): Observable<ICulture[]> {
    return this._http.get<ICulture[]>(this._url);
  }
}
