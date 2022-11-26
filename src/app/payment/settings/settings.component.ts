import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  employees: any[];
  selectedEmployee: any;
  filteredEmployees: any[];
  employeeObj: any;
  isEdit : boolean = false;

  constructor(
    private employeeService: EmployeeserviceService,
    private route: Router,
    private messageService: MessageService) { }

 
  ngOnInit(): void {
    this._getEmployees();
  }

  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status) {
       this.employees=response.employees
       this.addMessage(true, "EMployee Fetched")
      } 
      else this.addMessage(false, "Failed Employees")
      })
  }

  allowEdit() {
    this.employeeObj = this.selectedEmployee;
    this.isEdit=true;
  }

  filterEmployee(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employees.length; i++) {
      let emp = this.employees[i];
      if (emp.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(emp);
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

  onSave() {
    this.employeeService.amendEmployee(this.employeeObj).subscribe( response=> {
      if ( response.status ) {
        this.addMessage(true, "Employee Updated Successfully!")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })  
  }

  onCancel() { this.isEdit=false; this.selectedEmployee=null}

  Close() {
    this.route.navigate(['dashboard'])
  }

}
