import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EMPTY, Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraphsServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080';

  getHeatmap(
    name: string,
    attribute: string,
    date_time_start: Date,
    date_time_end: Date
  ): Observable<Record[]> {
    const start = new Date(
      date_time_start.getTime() - date_time_start.getTimezoneOffset() * 60000
    ).toISOString();
    const end = new Date(
      date_time_end.getTime() - date_time_end.getTimezoneOffset() * 60000
    ).toISOString();

    const httpOptions = new HttpParams()
      .set('attribute', attribute)
      .set('station', name)
      .set('timeStart', start)
      .set('timeEnd', end);

    return this.http
      .get<Array<Record>>(this.url + '/api/heatmap', { params: httpOptions })
      .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  getScatter(
    attribute: string,
    azimuthStart: string,
    azimuthEnd: string,
    elevationStart: string,
    elevationEnd: string,
    date_time_start: Date,
    date_time_end: Date
  ): Observable<Record[]> {
    const start = new Date(
      date_time_start.getTime() - date_time_start.getTimezoneOffset() * 60000
    ).toISOString();
    const end = new Date(
      date_time_end.getTime() - date_time_end.getTimezoneOffset() * 60000
    ).toISOString();

    const httpOptions = new HttpParams()
      .set('attribute', attribute)
      .set('azimuthStart', azimuthStart)
      .set('azimuthEnd', azimuthEnd)
      .set('elevationStart', elevationStart)
      .set('elevationEnd', elevationEnd)
      .set('timeStart', start)
      .set('timeEnd', end);

    return this.http
      .get<Array<Record>>(this.url + '/api/scatter', { params: httpOptions })
      .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  getStations(): Observable<string[]> {
    return this.http
      .get<string[]>(this.url + '/api/stations')
      .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  private httpErrorProcess(error) {
    if (error instanceof HttpErrorResponse) {
      console.log(error);
      return EMPTY;
    }
    return throwError(error);
  }
}

export interface Record {
  [attribute: string]: any;
}
