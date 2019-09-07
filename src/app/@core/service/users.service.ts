
import { Injectable } from '@angular/core';
import {ITechnologyScore, TechnologyScoreData, IUser, UserData, IData, IPaginatedUsers} from '../data/users';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {config} from '../config';
import 'rxjs/Rx';
import {map, mapTo, tap} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserData {
  constructor(private http: HttpClient) { super(); }

  deleteUserAsync(id: string): boolean {
    return false;
  }

  getUser(id: string): Observable<IData<IUser>> {
    return this.http.get<IData<IUser>>(config.apiUrl + '/user/' + id);
  }

  getUsers(query: string = '', page: number = 1, size: number = 100): Observable<IPaginatedUsers> {
    return this.http.get<IPaginatedUsers>(
      config.apiUrl + '/user',
      {params: {
          'search': query,
          'pageNumber': page.toString(),
          'pageSize': size.toString(),
        }},
      );
  }

  updateUserAsync(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(
      config.apiUrl + '/user/' + user.id,
      user,
    );
  }


}

@Injectable({
  providedIn: 'root',
})
export class TechnologyScoreService extends TechnologyScoreData {
  constructor(private http: HttpClient) { super(); }

  addTechnology(uid: string, tId: string): Observable<ITechnologyScore>{
    return this.http.post<ITechnologyScore>(config.apiUrl + '/user/' + uid + '/technology',
      {technologyId: tId},
      );
  }

  getScore(id: string, tId: string): Observable<ITechnologyScore> {
    return this.http.get<ITechnologyScore>(config.apiUrl + '/user/' + id + '/technology/' + tId);
  }
// /api/v1/user/{userId}/technology
  getScores(Id: string): Observable<ITechnologyScore[]> {
    return this.http.get<ITechnologyScore[]>(config.apiUrl + '/user/' + Id + '/technology');
  }
// /api/v1/user/{userId}/technology/{technologyId}/{score}
  updateScore(id: string, tId: string, score: number): Observable<ITechnologyScore> {
    return this.http.post<ITechnologyScore>(config.apiUrl + '/user/' + id + '/technology/' + tId + '/' + score,
      {},
    );
  }
// /api/v1/user/{userId}/technology/{technologyId}
  deleteTScore(id: string, tId: string): Observable<boolean> {
    return this.http.delete<boolean>(config.apiUrl + '/user/' + id + '/technology/' + tId).pipe(mapTo(true));
  }

}
