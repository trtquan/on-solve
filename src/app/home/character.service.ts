import { Http, URLSearchParams } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {  } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';

export interface IGetListOptions {
  page: number;
  perPage: number;
  query: string;
}
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private endpointUrl: string = '//gateway.marvel.com/v1/public/characters';
  private searchParamName = 'nameStartsWith';
  constructor(
    private http: Http
  ) { }

  get(id) {
    return this.http
      .get(this.endpointUrl + '/' + id, {
        search: this.getBaseSearchParams()
      })
      .pipe(
        map(responce => responce.json()),
        map(body => body.data.results[0]),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getList(options: IGetListOptions) {
    return this.http
      .get(this.endpointUrl, {
        search: this.getBaseSearchParams()
      })
      .pipe(
        map(responce => responce.json()),
        catchError(this.handleError('getHeroes', []))
      );
  }

  private getBaseSearchParams() {
    const baseSearchParams = new URLSearchParams();
    // TODO: Add API key globally for all requests to Marvel Entities API
    baseSearchParams.set('apikey', 'e82e1f8eb16da85c0260676f2cdb05b2');
    return baseSearchParams;
  }

  private getListSearchParams(options: IGetListOptions) {
    const searchParams = this.getBaseSearchParams();
    searchParams.set('limit', String(options.perPage));
    searchParams.set('offset', String(options.perPage * (options.page - 1)));
    if (this.searchParamName && options.query) {
      searchParams.set(this.searchParamName, options.query);
    }
    return searchParams;
  }
 /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
