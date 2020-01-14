import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../ApiService';

@Component({
    templateUrl: './employees.component.html'
})
export class Employees { 
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

    constructor(private http: HttpClient) {
        this._http = http;
        this._apiService = new ApiService(http, this);
        this.Employees();
    }

    Employees() {  
        this._apiService.getData('User/Employees', 
                                this.EmployeesCallback);
    }
    // Callback needs a pointer '_this' to current instance.
    EmployeesCallback(result, _this) {
        if(result.errorMessage == "") {
            _this.reqInfo = result.reqInfo;
            _this.users = result.users;
        }
        else {
            alert(JSON.stringify(result.errorMessage));
        }   
    }

}