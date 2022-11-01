import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
const AUTH0_CLIENT_ID = 'dev-e2b3ef63bjsiu718.us.auth0.com';
const AUTH0_DOMAIN = 'HYHG1HhRGc894nN8rPiN7LeLRzchPJoe';

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

  private API_URL = 'http://localhost:3000/';


  signIn(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.API_URL}/sign`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
      }),
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
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

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }


}
