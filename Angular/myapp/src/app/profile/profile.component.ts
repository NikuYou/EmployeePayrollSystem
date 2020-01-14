import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../ApiService';

@Component({
    templateUrl: './profile.component.html'
})
export class Profile { 
    _http:          HttpClient;
    _apiService:    ApiService;
    user:           {}=null;
    reqInfo:        {}=null;


    _username:       String="";
    _firstName:      String="";
    _lastName:       String="";
    _streetAddress:  String="";
    _email:          String="";
    _phone:          String="";

    constructor(private http: HttpClient) {
        this._http = http;
        // this.Profile();
        this._apiService = new ApiService(http, this);
        this.Profile();
    }

    Profile() {  
        this._apiService.getData('User/Profile', 
                                 this.ProfileCallback);
    }
    // Callback needs a pointer '_this' to current instance.
    ProfileCallback(result, _this) {
        if(result.errorMessage == "") {
            _this.reqInfo = result.reqInfo;
            _this.user = result.user.obj;


            _this._username = _this.user.username;
            _this._firstName = _this.user.firstName;
            _this._lastName = _this.user.lastName;
            _this._streetAddress = _this.user.streetAddress;
            _this._email = _this.user.email;
            _this._phone = _this.user.phone;

            
        }
        else {
            alert(JSON.stringify(result.errorMessage));
        }   
    }

    Update() {
        var newuser = {
          username: this._username,
          firstName: this._firstName,
          lastName: this._lastName,
          streetAddress: this._streetAddress,
          email: this._email,
          phone: this._phone
        };
        console.log(newuser);
        this._apiService.postData(
          "User/UpdateProfile",
          newuser,
          this.UpdateCallback
        );
      }
      UpdateCallback(result, _this) {
        if (result.errorMessage == "") {
          window.location.reload();
        } else {
          alert(JSON.stringify(result.errorMessage));
        }
      }
}