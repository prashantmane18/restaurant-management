import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly baseUrl = 'http://localhost:1012';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      {
        username: username,
        password: password
      },
      {
        responseType: 'text'
      }
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      {
        username: username,
        password: password
      }
    );
  }
}