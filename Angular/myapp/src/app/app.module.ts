import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login } from './login/login.component';
import { Payroll } from './payroll/payroll.component';
import { Profile } from './profile/profile.component';
import { Register } from './register/register.component';
import { Employees } from './employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Payroll,
    Profile,
    Register,
    Employees
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
