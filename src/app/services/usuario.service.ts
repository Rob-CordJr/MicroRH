import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  redirectUrl: string | undefined;

  errorHand: any;


  constructor(
    private http: HttpClient,
 
  ) {

  }


  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(environment.apiUrl+'usuarios')
  }

  getUserById(id : User) : Observable<User>{
    return this.http.get<User>(environment.apiUrl+'usuarios' + id)
  }

  handleError(error: any) {
    let description = 'Ocorreu aqui: ' + error.status;
    let errors = {
      errorcode: error.status,
      errorstatus: error.statusText,
      errordescription: description
    }
    return errors
  }






}
