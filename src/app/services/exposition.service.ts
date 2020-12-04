import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExposition } from '../domain/iexposition';

@Injectable({
  providedIn: 'root',
})
export class ExpositionService {
  private _url: string = environment.url + '/expo';

  constructor(private _http: HttpClient) {}

  public getAllCurrentExpos(
    page: number,
    items: number
  ): Observable<IExposition[]> {
    let myParams = new HttpParams();
    myParams = myParams.set('pageNumber', page.toString());
    myParams = myParams.set('itemsPerPage', items.toString());
    const options = { params: myParams };
    return this._http.get<IExposition[]>(this._url, options);
  }
  public getOldExpos(page: number, items: number): Observable<IExposition[]> {
    let myParams = new HttpParams();
    myParams = myParams.set('pageNumber', page.toString());
    myParams = myParams.set('itemsPerPage', items.toString());
    const options = { params: myParams };
    let url = this._url + '/old';
    return this._http.get<IExposition[]>(url, options);
  }
}
