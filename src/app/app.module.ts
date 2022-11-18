import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppPrimengModule } from './app-custom-material/app.primeng.module';
import { AppAngularModule } from './app-custom-material/app.angmaterial.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './sign/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './sign/adduser/adduser.component';
import { UserserviceService } from './services/userservice.service';
import { ModifyuserComponent } from './sign/modifyuser/modifyuser.component';
import { ChangepasswordComponent } from './sign/changepassword/changepassword.component';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { ModifyemployeeComponent } from './employee/modifyemployee/modifyemployee.component';
import { AddCategoryComponent } from './job/addcategory/addcategory.component';
import { ModifycategoryComponent } from './job/modifycategory/modifycategory.component';
import { AttendanceTypeComponent } from './attendance/attendance-type/attendance-type.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { LogAttendanceComponent } from './attendance/log-attendance/log-attendance.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AdduserComponent,
    ModifyuserComponent,
    ChangepasswordComponent,
    AddemployeeComponent,
    ModifyemployeeComponent,
    AddCategoryComponent,
    ModifycategoryComponent,
    AttendanceTypeComponent,
    ListEmployeeComponent,
    LogAttendanceComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppPrimengModule,
    AppAngularModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
