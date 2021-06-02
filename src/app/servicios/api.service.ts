import { UserInterface } from './../modelos/userInterface.interface';

import { ResponseI } from './../modelos/response.interface';
import { LoginI } from './../modelos/login.interface';
import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string="http://localhost:50274/api/";

  constructor(private http:HttpClient) { }

  headers: HttpHeaders= new HttpHeaders({
    "Content-type": "application/json"
  });

  registerUser(name: string, email: string, password: string) {
    const url_api = "http://localhost:50274/api";
    return this.http
      .post<UserInterface>(
        url_api,
        {
          email: email,
          password: password
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  loginuser(email: string, password: string): Observable<any> {
    const url_api = "http://localhost:50274/api/Login/GetAuth/"+email;
    return this.http
      .post<UserInterface>(
        url_api,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  login(formData){
    return this.http.post(this.url+'Login/prueba/', formData);
   
   /* .pipe(
      map((response: any)=>{
        const user= response;
        if(user.ok == "true"){
          localStorage.setItem('token',user.token);
        }
      })
    )*/
  }
  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `http://localhost:50274/api/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }


  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion= this.url+"/user/";
    return this.http.post<ResponseI>(direccion,form);
  }
  deleteEmployee(val:any){
    return this.http.delete(this.url+'/Employee/'+val);
  }

   /* Docentes  */
   getDocList():Observable<any[]>{
    return this.http.get<any>(this.url+'/Uer');
  }
}
