import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; //to have access to map function


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).map(
      (token) => {
        debugger;
        return this.saveToken(token);
      });
  }

  private saveToken(token: any): any {
    localStorage.setItem('bwm_auth', token);
    return token;
  }
}
