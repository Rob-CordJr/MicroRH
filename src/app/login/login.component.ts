import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from '../models/User';

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


  constructor() {

  }

  ngOnInit(): void {
  }

  LoginIn(): void {
    this.isLoading = true;
    this.button = 'Processando';

    if (this.isUserValid) {
      setTimeout(() => {
        this.isLoading = false;
        this.button = 'Aprovado, Usuario Reconhecido';
        alert('Acesso Liberado, Aguarde...');
        this.isAproved = true
      }, 8000)
    } else {
      setTimeout(() => {
        this.isLoading = false;
        this.button = 'Recusado ou Não Permitido';
        this.isRescued = true;
        alert('Contate o Administrador');
      }, 8000)
    }

  


  }
}












