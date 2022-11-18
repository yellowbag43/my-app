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
  employees             : Employee[]=[];
  attendanceCategories  : AttendanceType[]=[];
  ngdate                : Date;
  date_ready            : boolean = false;
  statuses: SelectItem[]=[];
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
        this._loadAttendanceTable();
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
      this.statuses.push( { label: value.type, value: value.type})
    })
  }

  //alist { name: string, category: string, attendance: string, nameid: number, aid : number}
 
  _loadAttendanceTable() 
  {
    let aname='Unknown';
    this.attendanceCategories.forEach((value) => {
      if ( value.ID ===0)
        aname = value.type;
    })

    this.employees.forEach( (value) => {
      this.alistObj.push( {
        name: value.name,
        category: value.typestr,
        attendance: aname,
        nameid: value.ID,
        aid: 0
      } ) 
    } )

  }

  logattendance() { this.date_ready=true}


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
      if ( value.type === aval)
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

    let dstr = this.displayDate()//:string = this.ngdate.getFullYear()+'-'+Number(this.ngdate.getMonth()+1)+'-'+this.ngdate.getDate();
    var entobj: [string, number , number]
    this.alistObj.forEach( (value) => {
      
      entobj = [dstr, value.nameid, this._getAttendanceID(value.attendance)]
      this.aentries.push(entobj)
    })

    const attendance = { attendance: this.aentries}
    console.log("attenddance push"+ JSON.stringify(attendance))
    this.attendanceService.addAttendance(attendance).subscribe( response=> {
      if( response.status) {
      this.addMessage(true, "Attendance marked for "+this.ngdate)      
      console.log("Attendance Logged for "+this.ngdate)}
    })
  }

  onExit() {
    this.router.navigate(['dashboard'])
  }
}
