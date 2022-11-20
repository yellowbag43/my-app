import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddemployeeComponent } from "./employee/addemployee/addemployee.component";
import { ModifyemployeeComponent } from "./employee/modifyemployee/modifyemployee.component";
import { HomeComponent } from "./home/home.component";
import { AdduserComponent } from "./sign/adduser/adduser.component";
import { ChangepasswordComponent } from "./sign/changepassword/changepassword.component";
import { LoginComponent } from "./sign/login/login.component";
import { ModifyuserComponent } from "./sign/modifyuser/modifyuser.component";
import { AttendanceTypeComponent } from "./attendance/attendance-type/attendance-type.component";
import { ListEmployeeComponent } from "./employee/list-employee/list-employee.component";
import { LogAttendanceComponent } from "./attendance/log-attendance/log-attendance.component";
import { QueryAttendanceComponent } from "./attendance/query-attendance/query-attendance.component";
import { JobTypesComponent } from "./job/job-types/job-types.component";
import { JobAddComponent } from "./job/job-add/job-add.component";

const routes:Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'jobadd',  component: JobAddComponent
    },
    {
        path: 'jobtypes',  component: JobTypesComponent
    },
    {
        path: 'adduser', component: AdduserComponent
    },
    {
        path: 'modifyuser', component: ModifyuserComponent
    },
    {
        path: 'changepassword', component: ChangepasswordComponent
    },
    {
        path: 'addemployee', component: AddemployeeComponent
    },
    {
        path: 'listemployee', component: ListEmployeeComponent
    },
    {
        path: 'modifyemployee', component: ModifyemployeeComponent
    },
    {
        path: 'attendancelog', component: LogAttendanceComponent
    },
    {
        path: 'attendancetype', component: AttendanceTypeComponent
    },
    {
        path: 'queryattendance', component: QueryAttendanceComponent
    }

];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
