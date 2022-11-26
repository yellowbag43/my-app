import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { AttendanceserviceService } from 'src/app/services/attendanceservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Employee, Employeetype } from 'src/app/models/employee';
import { AttendanceType } from 'src/app/models/attendance';
import { response  } from 'src/app/models/response';
import { Router, ActivatedRoute, createUrlTreeFromSnapshot } from '@angular/router';
import { SelectItem } from 'primeng/api';

interface Log   { date_str: string, id: number, type: number }
interface alist { name: string, category: string, attendance: string, nameid: number, aid : number}

@Component({
  selector: 'app-log-attendance',
  templateUrl: './log-attendance.component.html',
  styleUrls: ['./log-attendance.component.scss']
})
export class LogAttendanceComponent implements OnInit {
  employees             : any[]=[];
  selectedEmployee      : any;
  filteredEmployees     : any[];

  attendanceCategories  : any[]=[];
  selectedAttendance    : any;
  filteredAttendances   : any[];
  ngdate                : Date;
  isBulk                : boolean = false;
  isIndividual          : boolean = false;

  statuses: SelectItem[]=[];

  checked : boolean = false;

  alistObj : alist[]=[];
  logdb : Log[]=[];
  aentries: [string, number, number][];
  
  constructor(private employeeService: EmployeeserviceService,
              private attendanceService: AttendanceserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.ngdate = new Date()
    this._getEmployees();
  }

  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status ) {
        this.employees = response.employees;
        console.log(this.employees)
        this.addMessage(true, "Employees Fetched Successfully!")
        this._getAttendanceTypes();
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _getAttendanceTypes() {
    this.attendanceService.getAttendanceType().subscribe( response=> {
      if ( response.status ) {
        this.attendanceCategories = response.attendanceTypes;
        this.addMessage(true, "AttendanceCategories Fetched Successfully!")
        this._loadAttendanceTypesDropdown();
       // this._loadAttendanceTable();
        this.addMessage(true, "LoadAttendanceTable Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _loadAttendanceTypesDropdown()
  {
    this.attendanceCategories.forEach( (value) => {
      this.statuses.push( { label: value.name, value: value.name})
    })
  }

  //alist { name: string, category: string, attendance: string, nameid: number, aid : number}
 
  _loadAttendanceTable() 
  {
    let aname='Unknown';
    let aval = 0;
    if ( this.checked) aval = 20;  
    else aval = 0;


    this.attendanceCategories.forEach((value) => {
      if ( value.ID === aval) aname = value.name;
     })

    this.employees.forEach( (value) => {
      this.alistObj.push( {
        name: value.name,
        category: value.typestr,
        attendance: aname,
        nameid: value.ID,
        aid: aval
      } ) 
    } )
  }

  logBulk() { this.isBulk=true; this._loadAttendanceTable()}
  logSingle() { this.isIndividual=true}

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

//  interface Log   { date_str: string, id: number, type: number }

  _getAttendanceID(aval: string)
  {
    let id : number = 0;

    this.attendanceCategories.forEach((value) => {
      if ( value.name === aval)
           id = value.ID
    })
    return id;
  }

  displayDate() {
    let dstr :string = this.ngdate.getFullYear()+'-'+Number(this.ngdate.getMonth()+1)+'-'+this.ngdate.getDate();
    return dstr;
  }

  saveAttendance() {
    this.aentries = [['dummy',1,1]]
    this.aentries.pop();

    let dstr = this.displayDate()
    var entobj: [string, number , number]
    if ( this.isBulk) {
      this.alistObj.forEach( (value) => {
        
        entobj = [dstr, value.nameid, this._getAttendanceID(value.attendance)]
        this.aentries.push(entobj)
      })
    } else if ( this.isIndividual) {
        entobj = [ dstr, this.selectedEmployee.ID, this.selectedAttendance.ID]
        this.aentries.push(entobj)
    }

    const attendance = { attendance: this.aentries}
    console.log("attenddance push"+ JSON.stringify(attendance))
    this.attendanceService.addAttendance(attendance).subscribe( response=> {
      if( response.status) {
      this.addMessage(true, "Attendance marked for "+this.ngdate)      
      console.log("Attendance Logged for "+this.ngdate)}
      this.isBulk=false; this.isIndividual=false;
    })
  }

  filterEmployee(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    console.log(this.employees)
    for (let i = 0; i < this.employees.length; i++) {
      let emp = this.employees[i];
      if (emp.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(emp);
      }
    }
    this.filteredEmployees = filtered;
  }

  filterAttendance(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    console.log(this.attendanceCategories)
    for (let i = 0; i < this.attendanceCategories.length; i++) {
      let emp = this.attendanceCategories[i];
      if (emp.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(emp);
      }
    }
    this.filteredAttendances = filtered;
  }

  onCancel() {
    this.isBulk = false;
    this.isIndividual= false;
  }

  onExit() {
    this.router.navigate(['dashboard'])
  }
}
