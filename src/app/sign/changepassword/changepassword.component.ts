import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/users';
import { response  } from 'src/app/models/response';
import { Router } from '@angular/router';

interface Type { name: string, id: number }

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  allusers: User[]=[];
  userarr : Type[]=[];
  selectedUser : Type;
  otherclicked : boolean = false;
  radioClicked : boolean = false;
  passmatch : boolean = false;
  adminuser : boolean = true;
  result : response;
  password : string;
  repassword : string;
  passwordoption : string;
  displayBasic : boolean = false;
  
  constructor(private userService: UserserviceService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this._getUsers();
    if (!this.adminuser ) this.radioClicked=true;
  }

  onSave() {
    if (this.password !=this.repassword)
    { this.passmatch=true; return ;}

    let username;

    if (this.other()) username = this.selectedUser.name
    else  username="admin"

    const newpasswd : any = {
      login       : username,
      otp         : 'ADMIN',
      password    : this.password
    }

    this.userService.changePassword(newpasswd).subscribe( (x: any)=> {
      this.result = x;
      console.log("received "+ this.result.message)
        this.password=""
        this.repassword=""
        this.displayBasic = true;
        this.addMessage(this.result.status, this.result.message);          
        err=>{ console.error("Error "+this.result.message);
              this.addMessage(false, err);           
         }
        ()=> console.log("Completed!")
    })

  }

  _getUsers() {
    this.userService.getAllUsers().subscribe( response=> {
      if ( response.status ) {
        this.allusers = response.users;
        this._loadUserDropdown();
        this.addMessage(true, "Users Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _loadUserDropdown()
  {
    let tease : Type[]=[];

    this.allusers.forEach( (value) => {
      console.log(value.ID+", "+value.login)
      tease.push( { name: value.login, id: value.ID})
    })

    this.userarr = tease;
  }

  other() {
    this.radioClicked = true;
    if (this.passwordoption === 'other')  return true;
    
    return false;
  }

  closeWindow() {
    this.displayBasic = false;
    this.router.navigate(['/dashboard'])
  }
  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

}
