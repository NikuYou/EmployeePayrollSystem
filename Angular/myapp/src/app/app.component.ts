import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "./ApiService";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-root',
    template:   
    `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler d-lg-none" type="button" (click)="isCollapsed = !isCollapsed" [attr.aria-expanded]="!isCollapsed" 
         aria-controls="myNav" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="myNav" [ngbCollapse]="!isCollapsed">
      <ul class="mr-auto">
      </ul>
      <ul class="navbar-nav" *ngIf="checkLogin()">
        <li class="nav-item" *ngIf="checkManager() || checkHR()">
          <a class="nav-link" routerLink="/employees" routerLinkActive="active">Employees</a>
        </li>
        <li class="nav-item" *ngIf="checkHR()">
          <a class="nav-link" routerLink="/payroll" routerLinkActive="active">Payroll</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/profile" routerLinkActive="active">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/" (click)=Logout()>Logout </a>
        </li>
      </ul>
      <ul class="navbar-nav" *ngIf="!checkLogin()">
        <li class="nav-item">
          <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/register" routerLinkActive="active">Register</a>
        </li>
      </ul>
      </div>
    </nav>
    <div class="container">

      <!-- Where router should display a view -->
      <ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#fff" type="ball-scale-multiple">
        <p style="font-size: 20px; color: white">Loading the page...</p>
      </ngx-spinner>
      <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent { 
  _apiService: ApiService;
  secureData: Array<any>;
  

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {

    // this.Profile();
    this._apiService = new ApiService(http, this);
    this.checkLogin();
    this.getSecureData();
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }

  checkLogin() {
    if (sessionStorage.getItem("auth_token") != null) {
      return true;
    } else {
      return false;
    }
  }

  getSecureData() {  
    this._apiService.getData('User/SecureAreaJwt', 
                             this.secureDataCallback);
  }
  // Callback needs a pointer '_this' to current instance.
  secureDataCallback(result, _this) {
        _this.secureData = result.secureData;
   
}

  checkManager() {
    if (this.secureData != null){
      if ((this.secureData).indexOf("Manager") >= 0) {
        return true;
      }
    return false;
    }

    return false;
  }

  checkHR() {
    if (this.secureData != null){
      if ((this.secureData).indexOf("HR") >= 0) {
        return true;
      }
    return false;
    }

    return false;
      
  }

  Logout() {
    sessionStorage.clear();
  }
}
