import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArtefact } from '../domain/iartefact';
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

  public getCultureById(id: number): Observable<ICulture> {
    return this._http.get<ICulture>(this._url + '/' + id);
  }

  public getArtefactsFromCultureId(
    id: number,
    page: number,
    items: number
  ): Observable<IArtefact[]> {
    let myParams = new HttpParams();
    myParams = myParams.set('pageNumber', page.toString());
    myParams = myParams.set('itemsPerPage', items.toString());
    const options = { params: myParams };
    return this._http.get<IArtefact[]>(
      this._url + '/' + id + '/artefacts',
      options
    );
  }

  public addCulture(culture: ICulture): Observable<any> {
    return this._http.post(this._url, culture);
  }

  public editCulture(culture: ICulture): Observable<any> {
    return this._http.put(this._url, culture);
  }

  public deleteCulture(id: number): Observable<any> {
    return this._http.delete(this._url + '/' + id);
  }
}
