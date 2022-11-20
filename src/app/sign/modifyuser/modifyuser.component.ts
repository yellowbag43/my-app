import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/models/users';
import { Usertypes } from 'src/app/models/usertypes';

import { response  } from 'src/app/models/response';
import { Job } from 'src/app/models/job';

interface Type { name: string, id: number }

@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.scss']
})

export class ModifyuserComponent implements OnInit {
  allusers: User[]=[];
  isModify : boolean = false;
  allusertypes : Usertypes[]=[];
  typesarr : Type[]=[];
  selectedType: Type;
  userObj : User;

  constructor(private userService: UserserviceService,
              private messageService: MessageService,
              private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(user: User)
  {
    if ( user.user_type === 100) 
    {
      this.messageService.add({severity:'info', summary: 'Admin User', detail: 'Cannot DELETE', sticky: true});
      return;
    } 
    this.userService.deleteUser(user).subscribe( response=> {
      console.log(response);
      if (response.status) {
        this._getUsers();
        this.addMessage(true, "Users Deleted Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _getUsers() {
    this.userService.getAllUsers().subscribe( response=> {
      if ( response.status ) {
        this.allusers = response.users;
        console.log(this.allusers)
        this.addMessage(true, "Users Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _getUserByID(user: User) {
    this.userService.getUser_byID(user).subscribe( response=> {
      if ( response.status ) {
        this.userObj = response.user;
        console.log("Got Single User " + this.userObj.user_type + ", " + this.userObj.category )
        this.selectedType  = { name: this.userObj.category, id: this.userObj.user_type }
        this.addMessage(true, "User Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  onCancel() {
    this.isModify=false;
  }

  onSave() { 
   this.userObj.user_type = this.selectedType.id;

    this.userService.amendUser(this.userObj).subscribe( response=> {
      if ( response.status ) {
        this.addMessage(true, "User Updated Successfully!")
        this.isModify=false;
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  modifyUser(user: User){
    {
      this.isModify=true;
      this._getUsertypes();
      this._getUserByID(user)
//      this.router.navigate(['adduser', { id : user.ID}] )
    }
    }

    _getUsertypes() {
      this.userService.getUserTypes().subscribe( response=> {
          this.allusertypes = response.users;
          console.log(this.allusertypes);
          this._loadUsetypeDropdown();
      })
    }
  
    _assignType()
    {

    }

    _loadUsetypeDropdown()
    {
      let tease : Type[]=[];
  
      this.allusertypes.forEach( (value) => {
        console.log(value.ID+", "+value.category)
        tease.push( { name: value.category, id: value.ID})
      })
  
      this.typesarr = tease;
    }

    Close() {
      this.router.navigate(['dashboard'])
    }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

}
