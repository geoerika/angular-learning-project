import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import 'rxjs/Rx'; //to have access to map function

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}


@Injectable()
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp); //used moment.unix because decodedToken.exp is in msec
  }

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).map(
      (token) => this.saveToken(token));
  }

  public logout() {
    localStorage.removeItem('bwm_auth'); //remove the token from the local storage
    localStorage.removeItem('bwm_meta');
    this.decodedToken = new DecodedToken(); //reset the token after the logout to default
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken():string {
    return localStorage.getItem('bwm_auth');
  }

  public getUsername(): string {
    console.log('this.decodedToken.username: ', this.decodedToken.username);
    return this.decodedToken.username;
  }
}
