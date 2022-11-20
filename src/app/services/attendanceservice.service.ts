import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Attendance, AttendanceType } from '../models/attendance';
@Injectable({
  providedIn: 'root'
})
export class AttendanceserviceService {
  apiAttendanceURL = environment.apiAttendanceURL;

  constructor(private http: HttpClient) {}

  getAttendancebyDate(adate: string): Observable<any> {
    return this.http.get<any>(`${this.apiAttendanceURL}${adate}`);
  }

  queryAttendance(qdate: any): Observable<any> {
    return this.http.post<any>(`${this.apiAttendanceURL}query`, qdate);
  }

  getAttendanceType(): Observable<any> {
    return this.http.get<any>(`${this.apiAttendanceURL}type`);
  }
 
  addNewAttendanceType(newtype: AttendanceType): Observable<any> {
    return this.http.post<any>(`${this.apiAttendanceURL}addtype`, newtype);
  }

  amendJob(atype: AttendanceType): Observable<any> {
    return this.http.put<any>(`${this.apiAttendanceURL}amend`, atype);
  }

  deleteType(atype : AttendanceType): Observable<any> {
    return this.http.delete<any>(`${this.apiAttendanceURL}deletetype/${atype.ID}`);
  }

  addAttendance(newlog: any): Observable<any> {
    return this.http.post<any>(`${this.apiAttendanceURL}add`, newlog);
  }

}
