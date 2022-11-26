
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { JobsserviceService } from 'src/app/services/jobsservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Job } from 'src/app/models/job';
import { response } from 'src/app/models/response';
import { saveAs } from 'file-saver'
import { query } from '@angular/animations';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})

export class SalaryComponent implements OnInit {
  selectedMonth: Date;
  downloadfilename: string;
  isdownload : boolean=false;

  employeeCategories: any[];
  selectedCategory: any;
  filteredCategory: any[];

  paymentmode: string;
  pfchoice: string;

  constructor(private reportService : ReportsService,
              private employeeService: EmployeeserviceService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getEmployeeCategories();
  }

  _getEmployeeCategories() {
    this.employeeService.getEmployeeTypes().subscribe( response=> {
      if ( response.status ){
         this.employeeCategories=response.employeecategories;
         console.log(this.employeeCategories)
        }
    })
  }

  filterJob(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employeeCategories.length; i++) {
      let jobname = this.employeeCategories[i];
      if (jobname.type.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(jobname);
      }
    }

    this.filteredCategory = filtered;
    console.log(this.filteredCategory)
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

    var queryParams: [string, string, number, string, string];//fromdate, todate, emp-category, paymentmode]
 
    queryParams = [this.strDate(firstDay),   //From Date
                   this.strDate(lastDay),   //To Date
                   this.selectedCategory.ID, //Employee Category
                   this.paymentmode,
                  this.pfchoice]; //Payment mode

    const query= {
      query: queryParams,
    }
    this.reportService.getSalaryReport(query).subscribe( response=> {
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