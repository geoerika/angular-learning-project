import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/Rx'; //to have access to map function

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}


@Injectable()
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) {}

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).map(
      (token) => this.saveToken(token));
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
  }
}
