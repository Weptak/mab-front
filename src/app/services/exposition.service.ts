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

  public getExpoById(id: number): Observable<IExposition> {
    return this._http.get<IExposition>(this._url + '/' + id);
  }

  public addExpo(exposition: IExposition): Observable<any> {
    return this._http.post(this._url, exposition);
  }

  public editExpo(exposition: IExposition): Observable<any> {
    return this._http.put(this._url, exposition);
  }

  public addVisitor(id: number, number: number): Observable<any> {
    return this._http.patch(this._url + '/' + id, number);
  }

  public addArtefacts(id: number, items: string[]): Observable<any> {
    return this._http.patch(this._url + '/' + id + '/addArtefacts', items);
  }

  public deleteExpo(id: number): Observable<any> {
    return this._http.delete(this._url + '/' + id);
  }

  public endExpo(id: number): Observable<any> {
    return this._http.patch(this._url + '/' + id + '/endexpo', null);
  }
}
