import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { response  } from 'src/app/models/response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.scss']
})

export class UserCategoryComponent implements OnInit {
  allTypes : any[]=[];
  category : string;
  description : string;
  isSubmitted: boolean = false;
  result : response;
  isInputForm : boolean = false;
  isEdit : boolean = false;
  id : string;
  constructor(private userService : UserserviceService,
              private messageService : MessageService,
              private route: Router) { }

  ngOnInit(): void {
    this._getUserCategories()
  }

  _getUserCategories() {
    this.userService.getUserTypes().subscribe( response=> {
      if ( response.status ) {
        this.allTypes = response.categories;
        console.log(this.allTypes)
        this.addMessage(true, "Fetched User Categories Successfully!")
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
    this.category = '';
    this.description = ''; 
    this.id = null;
  }

  modifyType(type: any) {  
    this.isInputForm=true;
    this.isEdit=true; 
    this.category = type.category;
    this.description = type.description; 
    this.id = type.ID;
    this.isEdit = true;
  }

  onSave() {
  
    this.isSubmitted=true;
    if (this.category.length===0){  console.log("Invalid"); return; }

    const newType : any = {
      category : this.category,
      description :  this.description,
      ID   : this.id
    }
     if ( this.isEdit)
     {
       this.userService.amendUserCategory(newType).subscribe( 
         (x:any) => {
             this.result = x;
             this.category=""
             this.description=""
             this._getUserCategories()
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
      this.userService.addNewUserCategory(newType).subscribe( 
        (x:any) => {
            this.result = x;
            console.log("received "+ this.result.message)
            this.category=""
            this.description=""
            this._getUserCategories()
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
  
  deleteType(category: any) {
    this.userService.deleteUserCategory(category).subscribe( 
      (x:any) => {
        this.result = x;
        console.log("received "+ this.result.message)
        this._getUserCategories()
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

