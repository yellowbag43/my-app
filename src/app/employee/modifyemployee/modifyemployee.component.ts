import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { response  } from 'src/app/models/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifyemployee',
  templateUrl: './modifyemployee.component.html',
  styleUrls: ['./modifyemployee.component.scss']
})
export class ModifyemployeeComponent implements OnInit {
  allemployees: Employee[]=[];

  constructor(private employeeService: EmployeeserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router : Router) { }


  ngOnInit(): void {
    this._getEmployees()
  }

  
  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status ) {
        this.allemployees = response.employees;
        console.log(this.allemployees)
        this.addMessage(true, "Employees Fetched Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  modifyUser(employee: Employee)
  {
    this.router.navigate(['addemployee', { id : employee.ID}] )
  }

  deleteUser(employee: Employee)
  {

    this.employeeService.deleteEmployee(employee).subscribe( response=> {
      console.log(response);
      if (response.status) {
        this._getEmployees();
        this.addMessage(true, "Employee Deleted Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, response.message);           }
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
