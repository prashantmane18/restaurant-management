import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterResponse {
  id: string;
  username: string;
  role: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly baseUrl = 'http://localhost:1012';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/auth/register`,
      {
        username,
        password
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