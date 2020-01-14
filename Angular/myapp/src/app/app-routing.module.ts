import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login/login.component';
import { Payroll } from './payroll/payroll.component';
import { Profile } from './profile/profile.component';
import { Register } from './register/register.component';
import { Employees } from './employees/employees.component';

const appRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'payroll', component: Payroll },
  { path: 'profile', component: Profile },
  { path: 'register', component: Register },
  { path: 'employees', component: Employees }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
