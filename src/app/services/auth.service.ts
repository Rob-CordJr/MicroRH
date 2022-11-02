import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';




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
  ) {

  }



  signIn(payload: { email: string; password: string }): Observable<any> {
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

    return this.http.post<any>(environment.apiUrl + 'login', payload, httpOptions);

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

  isAuthenticated(){
    return true
  }



}
