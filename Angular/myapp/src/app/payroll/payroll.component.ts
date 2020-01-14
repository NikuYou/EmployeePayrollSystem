import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../ApiService';
import { sanitizeIdentifier } from '@angular/compiler';

const BASE_URL = "http://localhost:1337/User/";
@Component({
    templateUrl: './payroll.component.html'
})
export class Payroll { 
    _http:          HttpClient;
    users:          Array<any>;
    _apiService:    ApiService;
    reqInfo:        {}=null;
    user:           {}=null;

    username:       String="";
    firstName:      String="";
    lastName:       String="";
    streetAddress:  String="";
    email:          String="";
    phone:          String="";
    payroll:        Number;

    constructor(private http: HttpClient) {
        this._http = http;
        this._apiService = new ApiService(http, this);
        this.Payroll();
    }

    Payroll() {
        this._apiService.getData('User/Payroll', 
                                this.PayrollCallback);
    }

    PayrollCallback(result,_this) {
        if(result.errorMessage == "") {
            _this.reqInfo = result.reqInfo;
            _this.users = result.users;
        }
        else {
            alert(JSON.stringify(result.errorMessage));
        }   
    }


    UpdateSalary(user) {
        if (typeof(user.payroll) != "number") {
            alert("Please enter a valid number");
            return
          }
          // validate amount
        if (user.payroll < 0) {
            alert("Please pay your staff properly");
            return
          }
        var newuser = {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          streetAddress: user.streetAddress,
          email: user.email,
          phone: user.phone,
          payroll:user.payroll
        };
        console.log(newuser);
        this._apiService.postData(
          "User/UpdateSalary",
          newuser,
          this.UpdateSalaryCallback
        );
      }
      UpdateSalaryCallback(result, _this) {
        if (result.errorMessage == "") {
           window.location.reload();
        } else {
          alert(JSON.stringify(result.errorMessage));
        }
      }
}