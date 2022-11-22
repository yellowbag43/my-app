import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { JobsserviceService } from 'src/app/services/jobsservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Job } from 'src/app/models/job';
import { response } from 'src/app/models/response';
import { saveAs } from 'file-saver'
import { query } from '@angular/animations';

@Component({
  selector: 'app-jobwise',
  templateUrl: './jobwise.component.html',
  styleUrls: ['./jobwise.component.scss']
})
export class JobwiseComponent implements OnInit {
  jobs: Job[];
  selectedJob: Job;
  filteredJob: Job[];
  rangeDates: Date[];
  downloadfilename: string;
  isdownload : boolean=false;

  constructor(private reportService : ReportsService,
              private jobtypeService: JobsserviceService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getJobTypes()
  }

  _getJobTypes() {
    this.jobtypeService.getAllJobs().subscribe( response=> {
      if ( response.status )
         this.jobs=response.jobs;
    })
  }

  filterJob(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.jobs.length; i++) {
      let jobname = this.jobs[i];
      if (jobname.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(jobname);
      }
    }

    this.filteredJob = filtered;
  }

  strDate(dt: Date) {
    return dt.getFullYear()+'-'+Number(dt.getMonth()+1)+'-'+dt.getDate()
  }

  queryReport() {
    var queryParams: [string, string , number]
    queryParams = [this.strDate(this.rangeDates[0]), this.strDate(this.rangeDates[1]), Number(this.selectedJob.ID)]
    
    const query= {
      query: queryParams,
    }
    this.reportService.getAttendancebyDate(query).subscribe( response=> {
        if(response.status){
          this.isdownload=true;
          this.downloadfilename = response.downloadfile;
          this.addMessage(true, 'File available for download');
        }else
          this.addMessage(false, response.message);
      })

  }

  downloadReport() {
    this.isdownload=true;
    this.reportService.downloadFile(this.downloadfilename).subscribe( blob => {
//        saveAs(blob, filename)
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = this.downloadfilename;
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.addMessage(true, "File Downloaded Successfully")
    })
  }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }
}

//https://nils-mehlhorn.de/posts/angular-file-download-progress