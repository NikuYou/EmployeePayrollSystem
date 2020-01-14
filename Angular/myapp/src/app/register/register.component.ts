import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/User/";
@Component({
    templateUrl: './register.component.html'
})
export class Register { 
    _http:              HttpClient;
    _username:          String;
    _firstName:         String;
    _lastName:          String;
    _streetAddress:     String;
    _email:             String;
    _phone:             String;
    _password:          String;
    _passwordConfirm:   String;
    _errorMessage:      String = "";

    constructor(private http: HttpClient) {
        this._http = http;
    }

    RegisterUser() {
        this.http.post(BASE_URL + "RegisterUser",
        {
            username:           this._username,
            firstName:          this._firstName,
            lastName:           this._lastName,
            streetAddress:      this._streetAddress,
            email:              this._email,
            phone:              this._phone,
            password:           this._password,
            passwordConfirm:    this._passwordConfirm
        })
        .subscribe(
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                window.location.href = "http://localhost:4200/login";
            },
            error => {
                this._errorMessage = error;
            });

    }
}