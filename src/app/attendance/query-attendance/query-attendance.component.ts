import { Component, OnInit } from '@angular/core';
import {EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { AttendanceserviceService } from 'src/app/services/attendanceservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Employee,Employeetype} from 'src/app/models/employee';

@Component({
  selector: 'app-query-attendance',
  templateUrl: './query-attendance.component.html',
  styleUrls: ['./query-attendance.component.scss']
})
export class QueryAttendanceComponent implements OnInit {
  employees: Employee[];
  selectedEmployee: Employee;
  filteredEmployees: Employee[];

  isInput: boolean=true;
  rangeDates: Date[];
  attendance: any[];

  constructor(private employeeService: EmployeeserviceService,
    private attendanceService: AttendanceserviceService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getEmployees();
  }

  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status ) {
        this.employees = response.employees;

        this.addMessage(true, "Employees Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  queryDate() {
    let from_date: string;
    let to_date: string;
    from_date =this.rangeDates[0].getFullYear()+'-'+Number(this.rangeDates[0].getMonth()+1)+'-'+this.rangeDates[0].getDate()
    to_date   =this.rangeDates[1].getFullYear()+'-'+Number(this.rangeDates[1].getMonth()+1)+'-'+this.rangeDates[1].getDate()
    var entobj: [string, string , number]

    console.log("selcted employee "+this.selectedEmployee.name)

    entobj = [from_date, to_date, this.selectedEmployee.ID]

    console.log("selcted employee "+ entobj)

    const newquery  = {
      query : entobj
    }

    console.log("selcted query "+JSON.stringify( newquery) )

    this.attendanceService.queryAttendance(newquery).subscribe( (response)=> {
        if (response.status)
        {
          let la: any[];
          la=response.attendance[0]
          console.log("query fetched "+JSON.stringify(la))
          this.attendance= [{ date: '2022-11-02', type: 'dd'}]
          this.attendance.pop()

          la.forEach( (value) => {
              let tmp = new Date(value.date);
              let txt = tmp.getDate()+'-'+Number(tmp.getMonth()+1)+'-'+tmp.getFullYear()
              this.attendance.push({ date: txt, type: value.type })
          })
          this.addMessage(true, "Query Attendance Fetched Successfully!")
        }
        else
          console.log("Attendance Failed :")
      })
  }

  filterEmployee(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employees.length; i++) {
      let country = this.employees[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredEmployees = filtered;
  }

  addMessage(state: boolean, log: string) {
  this.messageService.add({
    severity: state ? 'success' : 'error',
    summary: state ? 'success' : 'error',
    detail: log
  })
}

}
