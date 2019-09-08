import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Tokens} from '../data/tokens';
import {config} from '../config';
import * as jwt_decode from 'jwt-decode';
import * as signalR from '@aspnet/signalr';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private hubConnection: signalR.HubConnection;
  private loggedUser: string;
  private storage: any = localStorage;

  constructor(private http: HttpClient,
              private toastrService: NbToastrService) {
  }

  connectToHub() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${config.apiBase}/notify`, {accessTokenFactory: () => this.getJwtToken()})
      .build();
    Object.defineProperty(WebSocket, 'OPEN', { value: 1 });

    this.hubConnection.on('newmark', (val, val2) => {
      const message = `new mark is ${val2} avg score is ${Math.round((val.avgScore) * 100) / 100}`;
      this.toastrService.show(message, `New mark for ` + val.technology.name,
        {limit: 3, status: 'info', icon: ''});
    });

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  disconnectFromHub() {
    this.hubConnection.stop().then(() => console.log('Connection stopped'))
      .catch(err => console.log('Error while stopping connection: ' + err));
  }

  login(user: { email: string, password: string }, remember: boolean = false): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/auth/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens, remember)),
        tap(() => this.connectToHub()),
        mapTo(true),
        catchError(error => {
          return of(error.error);
        }));
  }

  register(user: { email: string, password: string, fullName: string }): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/auth/register`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens, true)),
        tap(() => this.connectToHub()),
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
    this.disconnectFromHub();
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
    }), catchError(() => {this.doLogoutUser(); return of(false); }));
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
