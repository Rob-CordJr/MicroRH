import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  redirectUrl: string | undefined;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  errorHand: any;


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private API_URL = 'http://localhost:3000/img/';

  ngOnInit() {

  }

  login(user : User) {
    console.log(user)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.isLoggedIn.next(true);
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);

    } else {
      this.isLoggedIn.next(false);
    }

    return this.http.post<any>(environment.apiUrl + 'login', user, httpOptions);

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
