import { Component, OnInit } from '@angular/core';
import { JobsserviceService } from 'src/app/services/jobsservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { response  } from 'src/app/models/response';
import { Job  } from 'src/app/models/job';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-types',
  templateUrl: './job-types.component.html',
  styleUrls: ['./job-types.component.scss']
})

export class JobTypesComponent implements OnInit {
  allTypes : Job[]=[];
  name : string;
  description : string;
  isSubmitted: boolean = false;
  size: number;
  rate: number;
  result : response;
  isInputForm : boolean = false;
  isEdit : boolean = false;
  id : string;
  constructor(private jobService : JobsserviceService,
              private messageService : MessageService,
              private route: Router) { }

  ngOnInit(): void {
    this._getJobTypes()
  }

  _getJobTypes() {
    this.jobService.getAllJobs().subscribe( response=> {
      if ( response.status ) {
        this.allTypes = response.jobs;
        console.log(this.allTypes)
        this.addMessage(true, "Fetched Job types Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  addType()
  {
    this.isInputForm=true;
    this.isEdit=false; 
    this.name = '';
    this.description = ''; 
    this.id = null;
  }

  modifyType(type: Job) {  
    this.isInputForm=true;
    this.isEdit=true; 
    this.name = type.name;
    this.description = type.description; 
    this.size = type.size;
    this.rate = type.rate;
    this.id = type.ID;
    this.isEdit = true;
    console.log("new? "+this.id)
  }

  onSave() {
  
    this.isSubmitted=true;
    if (this.name.length===0){  console.log("Invalid"); return; }

    const newType : Job = {
      name : this.name,
      description :  this.description,
      rate : this.rate,
      size : this.size,
      ID   : this.id
    }
     if ( this.isEdit)
     {
       this.jobService.amendJob(newType).subscribe( 
         (x:any) => {
             this.result = x;
             this.name=""
             this.description=""
             this._getJobTypes()
              this.addMessage(this.result.status, this.result.message);            
           error=>{ console.error("Error "+error);
                 this.addMessage(false, error);           
            }
           ()=> console.log("Completed!")
           this.isEdit=false;
           this.isInputForm=false;
       })  
     }
     else {
      this.jobService.addNewJob(newType).subscribe( 
        (x:any) => {
            this.result = x;
            console.log("received "+ this.result.message)
            this.name=""
            this.description=""
            this._getJobTypes()
            this.addMessage(this.result.status, this.result.message);
            
          error=>{ console.error("Error "+error);
                this.addMessage(false, error);           
            }
          ()=> console.log("Completed!")
          this.isEdit=false;
          this.isInputForm=false;
        }) 
    }
  }
  
  onCancel() {
    this.isEdit=false
    this.isInputForm=false;
  };

  Close() {
    this.route.navigate(['dashboard'])
  }
  
  deleteType(job: Job) {
    this.jobService.deleteJob(job).subscribe( 
      (x:any) => {
        this.result = x;
        console.log("received "+ this.result.message)
        this._getJobTypes()
        this.addMessage(this.result.status, this.result.message);
          
        error=>{ console.error("Error "+error);
              this.addMessage(false, error);           
          }
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
