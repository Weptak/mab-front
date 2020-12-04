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
}
