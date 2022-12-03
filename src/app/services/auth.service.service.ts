
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';0
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  apiAuthURL = environment.apiAuthenticationURL;
  apiPasswordURL = environment.apiPassURL;

  constructor(private http: HttpClient) {}

  authenticateUser(user : any): Observable<any> {
    return this.http.post<any>(`${this.apiAuthURL}login`, user);
  }

  resetPassword(user :any): Observable<any> {
    return this.http.post<any>(`${this.apiPasswordURL}reset`, user);
  }

  changePassword(user :any): Observable<any> {
    return this.http.put<any>(`${this.apiPasswordURL}change`, user);
  }

}