import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';0
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  apiEmployeeURL = environment.apiEmployeeURL;
  
  constructor(private http: HttpClient) {}

  addNewEmployee(newemployee : Employee): Observable<any> {
    return this.http.post<any>(`${this.apiEmployeeURL}/add`, newemployee);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiEmployeeURL}all`);
  }

  getEmployee_byID(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEmployeeURL}get/${id}`);
  }

  amendEmployee(updatedemployee: Employee): Observable<any> {
    return this.http.put<any>(`${this.apiEmployeeURL}amend`, updatedemployee);
  }

  deleteEmployee(employee : Employee): Observable<any> {
    return this.http.put<any>(`${this.apiEmployeeURL}/amendstatus`, employee);
  }

  getEmployeeTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiEmployeeURL}/getcategory`);
  }

  addNewEmployeeType(newemployeetype : any): Observable<any> {
    return this.http.post<any>(`${this.apiEmployeeURL}/addemployeecategory`, newemployeetype);
  }

  amendEmployeeType(updatedemployeetype: any): Observable<any> {
    return this.http.put<any>(`${this.apiEmployeeURL}amendtype`, updatedemployeetype);
  }

  deleteEmployeeType(ID : string): Observable<any> {
    return this.http.delete<any>(`${this.apiEmployeeURL}deletetype/${ID}`);
  }

}
