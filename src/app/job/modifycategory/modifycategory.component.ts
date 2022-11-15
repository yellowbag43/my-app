import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/users';
import { response  } from 'src/app/models/response';
import { Router, TitleStrategy } from '@angular/router';
import { JobsserviceService  } from 'src/app/services/jobsservice.service';

@Component({
  selector: 'app-modifycategory',
  templateUrl: './modifycategory.component.html',
  styleUrls: ['./modifycategory.component.scss']
})
export class ModifycategoryComponent implements OnInit {
  alljobs: Job[]=[];
  allusers: User[]=[];

  constructor(
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private jobsService: JobsserviceService,
              private router : Router) { }

  ngOnInit(): void {
    this._getJobs()
    console.log("got jobs")
  }

   _getJobs() {
    this.jobsService.getAllJobs().subscribe( response=> {
      if ( response.status ) {
        this.alljobs = response.jobs;
        console.log(this.alljobs)
        this.addMessage(true, "Jobs Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  modifyJob(newjob: Job)
  {
    this.router.navigate(['addjobcategory', { id : newjob.ID}] )
  }

   deleteUser(job: Job)
   {
    console.log("DELETE Job "+job.ID)
    this.jobsService.deleteUser(job).subscribe( response=> {
      console.log(response);
      if (response.status) {
        this._getJobs();
        this.addMessage(true, "Job Deleted Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, response.message);           }
      ()=> console.log("Completed!")
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
