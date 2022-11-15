import { Component, OnInit } from '@angular/core';
import { AttendanceserviceService } from 'src/app/services/attendanceservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { response  } from 'src/app/models/response';
import { AttendanceType  } from 'src/app/models/attendance';
import { Router } from '@angular/router';


@Component({
  selector: 'app-attendance-type',
  templateUrl: './attendance-type.component.html',
  styleUrls: ['./attendance-type.component.scss']
})
export class AttendanceTypeComponent implements OnInit {
  allTypes : AttendanceType[]=[];
  name : string;
  description : string;
  isSubmitted: boolean = false;
  result : response;
  isEdit : boolean = false;
  id : number;
  constructor(private attendanceService : AttendanceserviceService,
              private messageService : MessageService) { }

  ngOnInit(): void {
    this._getAttendanceTypes()
  }

  _getAttendanceTypes() {
    this.attendanceService.getAttendanceType().subscribe( response=> {
      if ( response.status ) {
        this.allTypes = response.attendanceTypes;
        console.log(this.allTypes)
        this.addMessage(true, "Fetched Types Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  modifyType(type: AttendanceType) {   
    this.name = type.name;
    this.description = type.description; 
    this.id = type.ID;
    this.isEdit = true;
    console.log("new? "+this.id)
  }

  onSave() {
  
    this.isSubmitted=true;
    if (this.name.length===0){  console.log("Invalid"); return; }

    const newType : AttendanceType = {
      ID   : this.id,
      name : this.name,
      description :  this.description
    }
    console.log("new "+newType.ID)
     if ( this.isEdit)
     {
       this.attendanceService.amendJob(newType).subscribe( 
         (x:any) => {
             this.result = x;
             this.name=""
             this.description=""
             this._getAttendanceTypes()
              this.addMessage(this.result.status, this.result.message);            
           error=>{ console.error("Error "+error);
                 this.addMessage(false, error);           
            }
           ()=> console.log("Completed!")
       })  
     }
     else {
      this.attendanceService.addNewAttendanceType(newType).subscribe( 
        (x:any) => {
            this.result = x;
            console.log("received "+ this.result.message)
            this.name=""
            this.description=""
            this._getAttendanceTypes()
            this.addMessage(this.result.status, this.result.message);
            
          error=>{ console.error("Error "+error);
                this.addMessage(false, error);           
            }
          ()=> console.log("Completed!")
      }) 
    }
    }
  
  onCancel() {};

  deleteType(atype: AttendanceType) {
    this.attendanceService.deleteType(atype).subscribe( 
      (x:any) => {
        this.result = x;
        console.log("received "+ this.result.message)
        this._getAttendanceTypes()
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
