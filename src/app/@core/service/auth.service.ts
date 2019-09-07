import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Tokens} from '../data/tokens';
import {config} from '../config';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private storage: any = sessionStorage;

  constructor(private http: HttpClient) {
  }

  login(user: { email: string, password: string }, remember: boolean = false): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/auth/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens, remember)),
        mapTo(true),
        catchError(error => {
          return of(error.error);
        }));
  }

  register(user: { email: string, password: string, fullName: string }): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/auth/register`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens, true)),
        mapTo(true),
        catchError(error => {
          return of(error.error);
        }));
  }

  logout() {
    this.http.post(`${config.apiUrl}/auth/logout`, {
      'refreshToken': this.getRefreshToken(),
      'userId': this.CurrentId(),
    }).subscribe({error: err => {return; } });
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  CurrentId(): string {
    if (this.isLoggedIn()) {
      const tokenInfo = jwt_decode(this.getJwtToken());
      return tokenInfo['id'];
    } else
      return '';
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}/auth/refresh`, {
      'refreshToken': this.getRefreshToken(),
      'userId': this.CurrentId(),
    }).pipe(tap((tokens: Tokens) => {
      this.storeTokens(tokens);
    }));
  }

  getJwtToken() {
    return this.storage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, tokens: Tokens, remember: boolean = false) {
    this.storage = remember ? localStorage : sessionStorage;
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return this.storage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    this.storage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    this.storage.setItem(this.JWT_TOKEN, tokens.token);
    this.storage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    this.storage.removeItem(this.JWT_TOKEN);
    this.storage.removeItem(this.REFRESH_TOKEN);
  }
}
