import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/models/users';
import { response  } from 'src/app/models/response';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.scss']
})
export class ModifyuserComponent implements OnInit {
  allusers: User[]=[];

  constructor(private userService: UserserviceService,
              private messageService: MessageService,
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
    this.userService.deleteUser(user.ID).subscribe( response=> {
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


  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

}
