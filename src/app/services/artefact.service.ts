import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArtefact } from '../domain/iartefact';

@Injectable({
  providedIn: 'root',
})
export class ArtefactService {
  private _url: string = environment.url + '/collections';

  constructor(private _http: HttpClient) {}

  public getAllArtefacts(page: number, items: number): Observable<IArtefact[]> {
    let myParams = new HttpParams();
    myParams = myParams.set('pageNumber', page.toString());
    myParams = myParams.set('itemsPerPage', items.toString());
    const options = { params: myParams };
    return this._http.get<IArtefact[]>(this._url, options);
  }

  public getArtefactDetails(id: string): Observable<IArtefact> {
    return this._http.get<IArtefact>(this._url + '/' + id);
  }

  public addArtefact(artefact: IArtefact): Observable<any> {
    return this._http.post(this._url, artefact);
  }

  public editArtefact(artefact: IArtefact): Observable<any> {
    return this._http.put(this._url, artefact);
  }

  public changeLocation(id: number, room: string): Observable<any> {
    let myParams = new HttpParams();
    myParams = myParams.set('room', room);
    const options = { params: myParams };
    return this._http.patch(this._url + '/' + id, options);
  }

  public search(criteria: string): Observable<IArtefact[]> {
    let myParams = new HttpParams();
    myParams = myParams.set('criteria', criteria);
    const options = { params: myParams };
    return this._http.get<IArtefact[]>(this._url + '/search', options);
  }

  public deleteArtefact(id: string): Observable<any> {
    return this._http.delete(this._url + '/' + id);
  }
}
