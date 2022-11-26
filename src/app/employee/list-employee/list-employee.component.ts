import { Component, OnInit } from '@angular/core';
import {EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Employee,Employeetype} from 'src/app/models/employee';
import { response  } from 'src/app/models/response';
import { Job } from 'src/app/models/job';

interface Type { name: string, id: number }

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  allemployees: Employee[]=[];
  allusertypes : Employeetype[]=[];
  typesarr : Type[]=[];
  loading: boolean=true;

  constructor(private employeeService: EmployeeserviceService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getEmployees();
  }

  modifyEmployee(employee: Employee) {
      this.router.navigate(['modifyemployee', { id : employee.ID}] )
  }

  Close() { this.router.navigate(['dashboard'])}

  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status ) {
        this.allemployees = response.employees;
        this.loading=false;
        console.log(this.allemployees)
        this.addMessage(true, "Employees Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  deleteEmployee(employee: Employee)
  {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete Employee ? ['+employee.name+']',
      accept: ()=> {
        this._deleteEmployee(employee)
      }
    })
  }
  _deleteEmployee(employee: Employee)
  {
    this.employeeService.deleteEmployee(employee).subscribe( response=> {
      console.log(response);
      if (response.status) {
        this._getEmployees();
        this.addMessage(true, "Employee Deleted Successfully!")
      }else this.addMessage(false, response.message)
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
