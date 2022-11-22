import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Job } from 'src/app/models/job';
import { JobsserviceService } from 'src/app/services/jobsservice.service';
import { JoblogService } from 'src/app/services/joblog.service';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {
  jobs: Job[];
  selectedJob: Job;
  filteredJobs: Job[];
  employees: Employee[];
  selectedEmployee: Employee;
  filteredEmployees: Employee[];

  jdate: Date = new Date;
  count: number = 12;
  size: number;
  description: string = "test";

  keyMode : boolean=true;
  joblog : any[]=[];

  constructor(private jobService: JobsserviceService,
              private employeeService: EmployeeserviceService,
              private joblogService: JoblogService,
              private route: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getJobs()
    this._getEmployees()
    this._getJobLog();

  }

  _getJobs() {
    this.jobService.getAllJobs().subscribe( response=> {
      this.jobs=response.jobs
    })
  }

  _getJobLog() {
    const jobparams = {
      jobdate : this.jdate.getFullYear()+'-'+Number(this.jdate.getMonth()+1)+'-'+this.jdate.getDate()
    }

    this.joblogService.getJob_bytype(jobparams).subscribe( response=> {
      if (response.status) {
        this.joblog = response.joblog;
        console.log("Received "+response.joblog)
      }
    })
  }

  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status) {
       this.employees=response.employees
       this.addMessage(true, "EMployee Fetched")
      } 
      else this.addMessage(false, "Failed Employees")
      })
  }

  addjob() { 
    if ( this.jdate && this.selectedJob ) {
      console.log("Selected Job date ["+this.jdate +"],["+this.selectedJob.name+"]") 
      if (this.selectedEmployee)
        this.keyMode=false;
      this._getJobLog();
    }
}

  Save() { 

    const joblog = {
      employee : this.selectedEmployee.ID,
      job : this.selectedJob.ID,
      jobdate : this.jdate.getFullYear()+'-'+Number(this.jdate.getMonth()+1)+'-'+this.jdate.getDate(),
      count : this.count,
      size : this.size,
      description : this.description
    }

    this.keyMode=true; 
    this.selectedEmployee=null;

    this.joblogService.addNewJoblog(joblog).subscribe( response => {
      if (response.status) {
        this._getJobLog()
        console.log("Added job log")
        this.addMessage(true, "Job Added successfully")
      }
      else {
        console.log("Failed to add Log")
        this.addMessage(false, response.message)
      }
   
    })

  }

  Cancel() { this.keyMode=true; this.selectedEmployee=null}

  Close() {
    this.route.navigate(['dashboard'])
  }

  filterJob(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.jobs.length; i++) {
      let job = this.jobs[i];
      if (job.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(job);
      }
    }
    this.filteredJobs = filtered;
  }

  filterEmployee(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employees.length; i++) {
      let emp = this.employees[i];
      if (emp.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(emp);
      }
    }
    this.filteredEmployees = filtered;
  }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }  
}
