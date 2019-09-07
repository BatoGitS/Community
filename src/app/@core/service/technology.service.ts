
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {config} from '../config';
import 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import {ITechnology, TechnologyData} from '../data/technology';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService extends TechnologyData {
  constructor(private http: HttpClient) { super(); }

  createTechnology(tech: ITechnology): Observable<ITechnology> {
    return this.http.post(
      config.apiUrl + '/technology',
      tech,
    ).pipe(
      catchError(error => {
        return of(error.error);
      }));
  }

  getTechnologies(): Observable<ITechnology[]> {
    return this.http.get<ITechnology[]>(
      config.apiUrl + '/technology',
    );
  }

}
