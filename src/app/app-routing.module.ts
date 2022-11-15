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
import { AddCategoryComponent } from "./job/addcategory/addcategory.component";
import { ModifycategoryComponent } from "./job/modifycategory/modifycategory.component";
import { AttendanceTypeComponent } from "./attendance/attendance-type/attendance-type.component";

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
        path: 'addjobcategory',  component: AddCategoryComponent
    },
    {
        path: 'modifyjobcategory',  component: ModifycategoryComponent
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
        path: 'modifyemployee', component: ModifyemployeeComponent
    },
    {
        path: 'attendancetype', component: AttendanceTypeComponent
    },

];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
