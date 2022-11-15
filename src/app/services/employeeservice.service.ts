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

  getEmployeeTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiEmployeeURL}/getcategory`);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiEmployeeURL}/get`);
  }

  deleteEmployee(employee : Employee): Observable<any> {
    return this.http.put<any>(`${this.apiEmployeeURL}/amendstatus`, employee);
  }

}
