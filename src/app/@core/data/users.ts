import { Observable } from 'rxjs';
import {ITechnology} from './technology';

export interface IData<T> {
  data: T;
}
export interface IUser {
  fullName: string;
  about: string;
  city: string;
  birthDay: string;
  id: string;
}

export interface IPaginatedUsers {
  data: IUser[];
  pageNumber: number;
  pageSize: number;
  nextPage: string;
  previousPage: string;
}

export interface ITechnologyScore extends IUser {
  technology: ITechnology;
  avgScore: number;
}

export abstract class UserData {
  abstract getUsers(query: string, page: number, size: number): Observable<IPaginatedUsers>;
  abstract getUser(id: string): Observable<IData<IUser>>;
  abstract updateUserAsync(user: IUser): Observable<IUser>;
  abstract deleteUserAsync(id: string): boolean;
}
export abstract class TechnologyScoreData {
  abstract getScores(id: string): Observable<ITechnologyScore[]>;
  abstract getScore(id: string, tId: string): Observable<ITechnologyScore>;
  abstract updateScore(id: string, tId: string, score: number): Observable<ITechnologyScore>;
  abstract deleteTScore(id: string, tId: string): Observable<boolean>;
}
