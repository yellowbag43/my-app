import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HomescreenService } from 'src/app/services/homescreen.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form        : FormGroup;
  form2       : FormGroup;
  isSubmitted : boolean = false;
  authFails   : boolean = false;
  isLogin     : boolean = true;
  isOTP       : boolean = true;
  otpMessage  : string='OTP will be sent to registered Email'
  otplogin    : string;

  constructor(
    private router: Router,
    private messageService : MessageService,
    private authService: AuthServiceService,
    private homeScreenService: HomescreenService,
    private localStorage: LocalstorageService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      login     : ['', [Validators.required]],
      password  : ['', [Validators.required]]
    })

    this.form2 = this.fb.group({
      otp       : ['', [Validators.required]],
      password  : ['', [Validators.required]],
      repassword  : ['', [Validators.required]]
    })

  }

  login() {
    this.isSubmitted = true;

    if ( this.form.invalid)
    {
      return;
    }
    
    const login  = {
      login      : this.loginForm.login.value,
      password   : this.loginForm.password.value
    }

    this.authService.authenticateUser(login).subscribe( response=> {
      if (response.status){
          this.authFails=false;
          this.localStorage.storeKey(response.key)
          this.homeScreenService.setScreenFlag(true);
          this.router.navigate(['/dashboard'])
        }
      else          {
        this.authFails=true;
        this.homeScreenService.setScreenFlag(false);
        this.addMessage(false , response.message);
      }
    },(error)=> { this.authFails=true}, ()=> {  this.authFails=true} )
  }

  generateOTP() {

    this.authService.resetPassword( { login: this.otplogin}).subscribe( response=> {
      if (response.status)
        this.addMessage(true, response.message)
      else{
        this.addMessage(false, response.message)
      }
      this.isOTP=false;
    })
  }

  changePassword() {
    this.isSubmitted = true;

    if ( this.form2.invalid){   console.log("Form Invalid");   return;    }

    const user = { login : this.otplogin, 
                   otp: this.loginForm2.otp.value,
                   password: this.loginForm2.password.value}

    this.authService.changePassword(user).subscribe( response=> {
        if ( response.status)
        {
          this.addMessage(true, response.message) 
          this.isOTP=true; this.isLogin=true}
        else
         this.addMessage(false, response.message)
    },(error)=> { this.addMessage(false, error)})
    
    this.isSubmitted=false;

  }

  cancelSetPassword() { this.isLogin=true; this.isOTP=true;}
  forgotPassword() { this.isLogin=false;}

  clearpError() {
    this.isSubmitted=false;  this.authFails=false;
  }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

  get loginForm() {
    return this.form.controls;
  }
  get loginForm2() {
    return this.form2.controls;
  }

}
