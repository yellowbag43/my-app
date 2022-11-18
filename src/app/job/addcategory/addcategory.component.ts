import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Job } from 'src/app/models/job';
import { response } from 'src/app/models/response';
import { MessageService } from 'primeng/api';
import { JobsserviceService } from 'src/app/services/jobsservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})

export class AddCategoryComponent implements OnInit {
  name: string;
  description: string;
  rate: number;
  size: number;
  isSubmitted : boolean = false;
  isNameInvalid : boolean =false;
  result : response;
  id : string;

  constructor(              
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobsserviceService
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("ID Rceived "+this.id)
    if ( this.id ) this._getJobs();
  }

  _getJobs() {
    console.log("Jobs called")
    this.jobService.getJob_byID(this.id).subscribe( response=> {
      if ( response.status ) {
        this.name = response.job.name;
        this.description = response.job.description;
        this.size = response.job.size;
        this.rate = response.job.rate;
        this.addMessage(true, "Job Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  onCancel() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      accept: ()=> {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  onModify(job: Job)
  {

  }

  onSave() {
  
    this.isSubmitted=true;
    if (this.name.length===0) this.isNameInvalid=true;

    const newjob : Job = {
      ID   : this.id,
      name : this.name,
      description :  this.description,
      size : this.size,
      rate : this.rate
    }

    if ( this.id)
    {
      this.jobService.amendJob(newjob).subscribe( 
        (x:any) => {
            this.result = x;
            console.log("received "+ this.result.message)
            this._resetForm()
            this.addMessage(this.result.status, this.result.message);
            this.router.navigate(['/modifyjobcategory'])
            
          error=>{ console.error("Error "+error);
                this.addMessage(false, error);           
           }
          ()=> console.log("Completed!")
      })  
    }
    else {
      this.jobService.addNewJob(newjob).subscribe( 
        (x:any) => {
            this.result = x;
            console.log("received "+ this.result.message)
            this._resetForm()
            this.addMessage(this.result.status, this.result.message);
            
          error=>{ console.error("Error "+error);
                this.addMessage(false, error);           
            }
          ()=> console.log("Completed!")
      }) 
    }
   }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
   }
 
   _resetForm() {
      this.name = ""
      this.description = ""
      this.size = 0;
      this.rate = 0;
   }
}