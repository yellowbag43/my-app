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
import { JobwiseComponent } from "./report/jobwise/jobwise.component";
import { EmpCategoryComponent } from "./employee/emp-category/emp-category.component";
import { DailywagesComponent } from "./report/dailywages/dailywages.component";
import { TxnFormComponent } from "./transactions/txn-form/txn-form.component";
import { SalaryComponent } from "./report/salary/salary.component";
import { MyShellComponent } from "./my-shell/my-shell.component";
import { AuthGuard } from "./services/auth-guard.service";
import { UserCategoryComponent } from "./sign/user-category/user-category.component";

const routes:Routes = [
{
    path: 'login', component: LoginComponent
},
{
    path:'',
    component: MyShellComponent,
    canActivate: [AuthGuard],
    children: [
    {
        path: 'dashboard', component: DashboardComponent
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
        path: 'usercategory', component: UserCategoryComponent
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
    },
    {
        path: 'reportjobwise', component: JobwiseComponent
    },
    {
        path: 'listemployeecategory', component: EmpCategoryComponent
    },
    {
        path: 'reportdailywages', component: DailywagesComponent
    },
    {
        path: 'transactions', component: TxnFormComponent
    },
    {
        path: 'salaries', component: SalaryComponent
    }
    ]
}
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
