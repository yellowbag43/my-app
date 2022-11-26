import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Employee, Employeetype } from 'src/app/models/employee';
import { response  } from 'src/app/models/response';

interface Type { name: string, id: number }

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {
  form        : FormGroup;
  isSubmitted : boolean = false;
  allemployeetypes: Employeetype[]=[];
  typesarr : Type[]=[];
  result : response;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeserviceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this._getEmployeetypes();

    this.form = this.fb.group({
      name        : ['', [Validators.required]],
      dob         : ['', [Validators.required]],
      gender      : ['', [Validators.required]],
      employeetype: ['', [Validators.required]],
      title       : [''],
      email       : [''],
      mobile      : ['', [Validators.required]],
      address     : [''],
      city        : [''],
      state       : [''],
      zip         : [''],
      pf          : [''],
      bank        : [''],
      paymentmode : [''],
      salary      : [''],
      accountname : [''],
      account     : [''],
      ifsccode    : [''],
      cashadvance : [''] 
    })
  }

  onSave() {
    this.isSubmitted = true;

    if ( this.form.invalid)
    {
      return;
    }

    let dob_db: Date = new Date(this.employeeForm.dob.value);
      const newemployee : any = {
        name          : this.employeeForm.name.value,
        dob           : dob_db,
        gender        : this.employeeForm.gender.value,
        type          : this.employeeForm.employeetype.value.id,
        title         : this.employeeForm.title.value,
        email         : this.employeeForm.email.value,
        mobile        : this.employeeForm.mobile.value,
        address       : this.employeeForm.address.value,
        area          : this.employeeForm.city.value,
        state         : this.employeeForm.state.value,
        zip           : this.employeeForm.zip.value,
        pf            : this.employeeForm.pf.value,
        bankname      : this.employeeForm.bank.value,
        salary        : this.employeeForm.salary.value,
        paymentmode   : this.employeeForm.paymentmode.value,
        account       : this.employeeForm.account.value,
        accountname   : this.employeeForm.accountname.value,
        ifsccode      : this.employeeForm.ifsccode.value,
        cashadvance   : this.employeeForm.cashadvance.value
      }

      this.employeeService.addNewEmployee(newemployee).subscribe( (x: any)=> {
           this.result = x;
           if ( x.status ){
           console.log("received "+ this.result.message)
          this.addMessage(this.result.status, this.result.message);   }     
          else this.addMessage(false, this.result.message)  
          this.onSaveConfrm();
          this.form.reset()
          err=>{ console.error("Error "+this.result.message);
                this.addMessage(false, err);           
           }
          ()=> console.log("Completed!")
      })
  }

  _getEmployeetypes() {
    this.employeeService.getEmployeeTypes().subscribe( response=> {
      if ( response.status) {
        this.allemployeetypes = response.employeecategories;
        this._loadEmployeetypeDropdown();}
    })
  }

  _loadEmployeetypeDropdown()
  {
    let tease : Type[]=[];
    console.log("Employe type searching)")
    this.allemployeetypes.forEach( (value) => {
      console.log(value.ID+", "+value.type)
      tease.push( { name: value.type, id: value.ID})
    })

    this.typesarr = tease;
  }

  onSaveConfrm() {
    this.confirmationService.confirm({
      message: 'You want to add more Employee?',
      reject: ()=> {
        this.router.navigate(['/dashboard'])
      }
    })

  }

  onCancel() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to close?',
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

  get employeeForm() {
    return this.form.controls;
  }
}
