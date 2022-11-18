import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Usertypes } from 'src/app/models/usertypes';
import { User } from 'src/app/models/users';
import { response  } from 'src/app/models/response';

interface Type { name: string, id: number }

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  form        : FormGroup;
  isSubmitted : boolean = false;
  passwordmatching : boolean = false;
  allusertypes : Usertypes[]=[];
  typesarr : Type[]=[];
  result : response;
  errorstr: string;

  constructor(
              private router: Router,
              private userService: UserserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this._getUsertypes();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username    : ['', [Validators.required]],
      login       : ['', [Validators.required]],
      password    : ['', [Validators.required]],
      repassword  : ['', [Validators.required]],
      usertype    : ['', [Validators.required]],
      email       : ['', [Validators.required, Validators.email]],
      mobile      : ['', [Validators.required]],
      address     : [''],
      city        : [''],
      state       : [''],
      zip         : ['']
    })
  }

  passwordmatch() {
    if ( this.userForm.password.value != this.userForm.repassword.value)
      this.passwordmatching = true;
    else
      this.passwordmatching= false;
  }

  onSave() {
    this.isSubmitted = true;

    if ( this.form.invalid)
    {
      return;
    }

      const newuser : User = {
        name : this.userForm.username.value,
        login       : this.userForm.login.value,
        user_type   : this.userForm.usertype.value.id,
        password    : this.userForm.password.value,
        mobile      : this.userForm.mobile.value,
        email       : this.userForm.email.value,
        address     : this.userForm.address.value,
        area        : this.userForm.city.value,
        state       : this.userForm.state.value,
        zip         : this.userForm.zip.value
      }

      this.userService.addNewUser(newuser).subscribe( (x: any)=> {
        this.result = x;
        console.log("received "+ this.result.message)
          this.addMessage(this.result.status, this.result.message);
          this.router.navigate([''] )     
          err=>{ console.error("Error "+this.result.message);
                this.addMessage(false, err);           
           }
          ()=> console.log("Completed!")
      })
  }

  _getUsertypes() {
    this.userService.getUserTypes().subscribe( response=> {
        this.allusertypes = response.users;
        console.log(this.allusertypes);
        this._loadUsetypeDropdown();
    })
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

  onCancel() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      accept: ()=> {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

  get userForm() {
    return this.form.controls;
  }
}
