import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { response  } from 'src/app/models/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-category',
  templateUrl: './emp-category.component.html',
  styleUrls: ['./emp-category.component.scss']
})

export class EmpCategoryComponent implements OnInit {
  allTypes : any[]=[];
  type : string;
  description : string;
  isSubmitted: boolean = false;
  result : response;
  isInputForm : boolean = false;
  isEdit : boolean = false;
  id : string;
  constructor(private employeeService : EmployeeserviceService,
              private messageService : MessageService,
              private route: Router) { }

  ngOnInit(): void {
    this._getEmployeeTypes()
  }

  _getEmployeeTypes() {
    this.employeeService.getEmployeeTypes().subscribe( response=> {
      if ( response.status ) {
        this.allTypes = response.employeecategories;
        console.log(this.allTypes)
        this.addMessage(true, "Fetched Employee types Successfully!")
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
    this.type = '';
    this.description = ''; 
    this.id = null;
  }

  modifyType(type: any) {  
    this.isInputForm=true;
    this.isEdit=true; 
    this.type = type.type;
    this.description = type.description; 
    this.id = type.ID;
    this.isEdit = true;
    console.log("new? "+this.id)
  }

  onSave() {
  
    this.isSubmitted=true;
    if (this.type.length===0){  console.log("Invalid"); return; }

    const newType : any = {
      type : this.type,
      description :  this.description,
      ID   : this.id
    }
     if ( this.isEdit)
     {
       this.employeeService.amendEmployeeType(newType).subscribe( 
         (x:any) => {
             this.result = x;
             this.type=""
             this.description=""
             this._getEmployeeTypes()
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
      this.employeeService.addNewEmployeeType(newType).subscribe( 
        (x:any) => {
            this.result = x;
            console.log("received "+ this.result.message)
            this.type=""
            this.description=""
            this._getEmployeeTypes()
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
  
  deleteType(employeetype: any) {
    this.employeeService.deleteEmployeeType(employeetype.ID).subscribe( 
      (x:any) => {
        this.result = x;
        console.log("received "+ this.result.message)
        this._getEmployeeTypes()
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

