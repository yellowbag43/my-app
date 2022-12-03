import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Employee, Employeetype } from 'src/app/models/employee';
import { response  } from 'src/app/models/response';
import { Router, ActivatedRoute } from '@angular/router';

interface Type { name: string, id: number }

@Component({
  selector: 'app-modifyemployee',
  templateUrl: './modifyemployee.component.html',
  styleUrls: ['./modifyemployee.component.scss']
})
export class ModifyemployeeComponent implements OnInit {
  employeeObj : any;
  isModify    : boolean=false;
  isEditPayment : boolean=false;

  allemp_types        : Employeetype[]=[];
  emptypes_arr        : Type[]=[];
  selected_EmpType    : Type;
  selected_GenderType : Type;
  data_ready : boolean = false;
  id: string;
  gendertypes_arr : Type[] = [
    {name: 'Male',   id: 1},
    {name: 'Female', id: 2},
    {name: 'Other',  id: 3} 
  ];

  constructor(private employeeService: EmployeeserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
   
    this._getEmployeetypes();      
  }

  _getEmployeetypes() {
    this.employeeService.getEmployeeTypes().subscribe( response=> {
      if( response.status) {
        this.allemp_types = response.employeecategories;
        this._loadEmptypeDropdown();
        this._getEmployee();
       }
    })
  }

  _getEmployee() {
    this.employeeService.getEmployee_byID(this.id).subscribe( response=> {
      if ( response.status ) {
        this.employeeObj = response.employee;
        this.employeeObj.dob = new Date(response.employee.dob);
        this._assignType();
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _assignType()
  {
    let category = this.employeeObj.type.toString();
    this.emptypes_arr.forEach( (value) => {
      if ( category === value.name) {
        this.selected_EmpType =  { name: category, id: value.id}
      }
    })
    this.gendertypes_arr.forEach( (value) => {
      if ( this.employeeObj.gender === value.id) {
        this.selected_GenderType =  { name: value.name, id: value.id}
      }
    })

    this.data_ready=true;
  }

  _loadEmptypeDropdown()
  {
    let tease : Type[]=[];

    this.allemp_types.forEach( (value) => {
      console.log(value.ID+", "+value.type)
      tease.push( { name: value.type, id: value.ID})
    })

    this.emptypes_arr = tease;
  }

  OnSave() {
    this.employeeObj.type = this.selected_EmpType.id;
    this.employeeObj.gender = this.selected_GenderType.id;
    this.employeeService.amendEmployee(this.employeeObj).subscribe( response=> {
      if ( response.status ) {
        this.addMessage(true, "Employee Updated Successfully!")
        this.router.navigate(['listemployee'])
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  OnCancel() {
    this.router.navigate(['listemployee'])
  }

  onEditPayment() {
    this.isEditPayment=true;
  }
  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

}
