import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';0
import { environment } from 'src/environments/environment';
import { Usertypes } from '../models/usertypes';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  apiUserURL = environment.apiUserURL;
  apiPassURL = environment.apiPassURL;

  constructor(private http: HttpClient) {}

  addNewUser(newuser : User): Observable<any> {
    return this.http.post<any>(`${this.apiUserURL}/register`, newuser);
  }

  getUserTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUserURL}/getcategory`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUserURL}get`);
  }

  deleteUser(userID : number): Observable<any> {
    return this.http.delete<any>(`${this.apiUserURL}/${userID}`);
  }

  changePassword(newpasswd : any): Observable<any> {
    return this.http.put<any>(`${this.apiPassURL}/change`, newpasswd);
  }
}
