import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JoblogService {
  apiJobLogURL = environment.apiJoblogURL

  constructor(private http: HttpClient) {}

  getJob_bytype(jobq: any): Observable<any> {
    return this.http.post<any>(`${this.apiJobLogURL}query`, jobq);
  }

  addNewJoblog(newjob: any): Observable<any> {
    console.log("service date "+newjob.jobdate)
    return this.http.post<any>(`${this.apiJobLogURL}add`, newjob);
  }


}
