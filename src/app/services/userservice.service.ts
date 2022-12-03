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
    return this.http.post<any>(`${this.apiUserURL}/add`, newuser);
  }

  amendUser(updatedjob: User): Observable<any> {
    return this.http.put<any>(`${this.apiUserURL}amend`, updatedjob);
  }

  addNewUserCategory(category : any): Observable<any> {
    return this.http.post<any>(`${this.apiUserURL}/addcategory`, category);
  }

  amendUserCategory(category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUserURL}amendcategory`, category);
  }

  getUserTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUserURL}/getcategory`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUserURL}all`);
  }

  getUser_byID(user: User): Observable<any> {
    return this.http.get<any>(`${this.apiUserURL}get/${user.ID}`);
  }

  deleteUser(userID): Observable<any> {
    return this.http.delete<any>(`${this.apiUserURL}/${userID.ID}`);
  }

  deleteUserCategory(categoryID): Observable<any> {
    return this.http.delete<any>(`${this.apiUserURL}category/${categoryID.ID}`);
  }

  changePassword(newpasswd : any): Observable<any> {
    return this.http.put<any>(`${this.apiPassURL}/change`, newpasswd);
  }
}
