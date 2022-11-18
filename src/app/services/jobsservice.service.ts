import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobsserviceService {
  apiJobsURL = environment.apiJobURL;

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiJobsURL}all`);
  }

  getJob_byID(ID :string): Observable<any> {
    return this.http.get<any>(`${this.apiJobsURL}get/${ID}`);
  }

  addNewJob(newjob: Job): Observable<any> {
    return this.http.post<any>(`${this.apiJobsURL}add`, newjob);
  }

  amendJob(updatedjob: Job): Observable<any> {
    return this.http.put<any>(`${this.apiJobsURL}amend`, updatedjob);
  }
  
  deleteUser(job : Job): Observable<any> {
    return this.http.delete<any>(`${this.apiJobsURL}/${job.ID}`);
  }

}
