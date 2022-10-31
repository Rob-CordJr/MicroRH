import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  // Efeito de Labels acima de placeholders
  isFocused: boolean = false;
  someValue: string | undefined;
  isFocused2: boolean = false;
  someValue2: string | undefined;
  isLoading: boolean = false;
  button: string = 'Acesse o Portal';
  isUserValid: boolean = false;
  isAproved: boolean = false
  isRescued: boolean = false
  userLogin: any;
  userType: number = 2;


  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.LoginIn()
  }

  LoginIn(): void {

    if (this.isUserValid) {
      this.isLoading = true;
      this.button = 'Processando';

      switch (this.userType) {
        // Administrador
        case 1: {
          setTimeout(() => {
            this.isLoading = false;
            this.button = 'Aprovado, Usuario Reconhecido';
            alert('Acesso Liberado, Aguarde...');
            this.isAproved = true
          }, 8000)
          this.router.navigate(['/painel-adm']);
          break;
        }
        // Usuario comum
        case 2: {
          setTimeout(() => {
            this.isLoading = false;
            this.button = 'Aprovado, Usuario Reconhecido';
            alert('Acesso Liberado, Aguarde...');
            this.isAproved = true
          }, 8000)
          this.router.navigate(['/painel-rh']);
          break;
        }

        default:

          this.router.navigate(['/']);
          this.button
          break;

      }
    }

    // if (!this.isUserValid) {
    //   this.isLoading = true;
    //   this.button = 'Processando';
    //   setTimeout(() => {
    //     this.isLoading = false;
    //     this.button = 'Recusado, Não permitido';
    //     alert('Entre em contato com Administrador...');
    //     this.isAproved = true
    //   }, 3000)
    // }

  }

  Login() {
    this.authService.login(this.user).subscribe(
      result => {
        if (result[0].login == true) {
          this.user = result;
          this.localStorage.set('id_usuario', result[0].id_usuario);
          this.localStorage.set('nm_usuario', result[0].nm_usuario);
          this.localStorage.set('last_login', result[0].last_login);
          this.localStorage.set('sector', result[0].sector);
          this.localStorage.set('tp_usuario', result[0].tp_usuario);
          this.localStorage.set('mail', result[0].mail);
          this.localStorage.set('loggin', result[0].loggin);
          this.localStorage.set('create_at', result[0].create_at)

        }
      }
    );
  }

}












