import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/";
@Component({
    templateUrl: './login.component.html'
})
export class Login {
    _http:      HttpClient;
    token:      String;
    _username:  String;
    _password:  String;

    constructor(private http: HttpClient) {
        this._http = http;
    }

    Login() {
        let url = BASE_URL + "auth";
    
        // This free online service receives post submissions.
        this.http.post(url, {
                username:  this._username,
                password:  this._password,
            })
        .subscribe( 
        // Data is received from the post request.
        (data) => {
            // Inspect the data to know how to parse it.
            console.log(JSON.stringify(data));
            
            if(data["token"]  != null)  {
                this.token = data["token"]     
                sessionStorage.setItem('auth_token', data["token"]);
            }   
            window.location.href = "http://localhost:4200/profile";
        },
        // An error occurred. Data is not received. 
        error => {
            alert(JSON.stringify(error));             
        });
    }

}