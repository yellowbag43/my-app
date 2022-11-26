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
  selector: 'app-dailywages',
  templateUrl: './dailywages.component.html',
  styleUrls: ['./dailywages.component.scss']
})
export class DailywagesComponent implements OnInit {
  selectedMonth: Date;
  downloadfilename: string;
  isdownload : boolean=false;

  constructor(private reportService : ReportsService,
              private jobtypeService: JobsserviceService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  strDate(dt: Date) {
    return dt.getFullYear()+'-'+Number(dt.getMonth()+1)+'-'+dt.getDate()
  }

  _getDaysInMonth(year, month) {
    return new Date(year, month+1, 0).getDate();
  }

  queryReport() {
    const firstDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 1);
    
    const lastDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0);

    var queryParams: [string, string , number]
    queryParams = [this.strDate(firstDay), this.strDate(lastDay), 0]
    
    const query= {
      query: queryParams,
    }
    this.reportService.getDailyWagesByDate(query).subscribe( response=> {
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