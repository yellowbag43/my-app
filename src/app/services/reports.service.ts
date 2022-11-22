import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  apiReportURL = environment.apiReportsURL;

  constructor(private http: HttpClient) {}

  downloadFile(lfile: string): Observable<Blob> {
    return this.http.get(`${this.apiReportURL}/download/${lfile}`, {
      reportProgress: true,
      responseType: 'blob'});
  }

  getAttendancebyDate(query: any): Observable<any> {
    return this.http.post<any>(`${this.apiReportURL}/excelschema`, query);
  }

}

