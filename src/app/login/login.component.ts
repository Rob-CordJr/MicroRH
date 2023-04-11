import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: NgbDateStruct | undefined;
	date: { year: number; month: number; } | undefined;
  public formAuth: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })
  user = new User();
  // Efeito de Labels acima de placeholders
  isFocused: boolean = false;
  someValue: string | undefined;
  isFocused2: boolean = false;
  someValue2: string | undefined;
  isLoading: boolean = false;
  button: string = 'Acesse o Portal';
  isUserValid: boolean = false;
  isAproved: boolean = false;
  isRescued: boolean = false;
  userLogin: any;
  userType: number = 2;
  public visible = false;
  selectedSector: number | undefined;

  sector = [
    
    { id: 1, name: 'ABAST' },
    { id: 2, name: 'AC' },
    { id: 3, name: 'AJ' },
    { id: 4, name: 'ASSESSORIA DE GABINETE' },
    { id: 5, name: 'ASSESSORIA ESPECIAL' },
    { id: 6, name: 'ASSESSORIA PARLAMENTAR' },
    { id: 7, name: 'ASSESSORIA SEC. ADJUNTA' },
    { id: 8, name: 'ASSESSORIA TECNICA' },
    { id: 9, name: 'ATOS' },
    { id: 10, name: 'CADM' },
    { id: 11, name: 'COGEL' },
    { id: 12, name: 'CONVIAS' },
    { id: 13, name: 'COPLAN' },
    { id: 14, name: 'COPURB' },
    { id: 15, name: 'COTI' },
    { id: 16, name: 'DEGUOS' },
    { id: 17, name: 'DFIN' },
    { id: 18, name: 'DGEP' },
    { id: 19, name: 'DZU' },
    { id: 20, name: 'GABINETE' },
    { id: 21, name: 'SELIMP' },
    { id: 22, name: 'UNILOG' },
   
  ];
  cpassword: any;

  constructor(

    private fb: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {

  }

  closeResult = '';

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
          }, 3000)
          this.router.navigate(['/painel']);
          break;
        }
        // Usuario comum
        case 2: {
          setTimeout(() => {
            this.isLoading = false;
            this.button = 'Aprovado, Usuario Reconhecido';
            alert('Acesso Liberado, Aguarde...');
            this.isAproved = true
          }, 3000)
          this.router.navigate(['/painel']);
          break;
        }

        default:
          this.router.navigate(['/']);
          this.button
          break;

      }
    }



  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  SignInForm() {
    this.authService.signIn(this.formAuth.value).subscribe(
      result => {

        if (result[0].login == true) {

          this.user = result;
          this.localStorage.set('id_usuario', result[0].id_usuario);
          this.localStorage.set('nm_usuario', result[0].nome);
          this.localStorage.set('nm_usuario', result[0].sobrenome);
          this.localStorage.set('last_login', result[0].last_login);
          this.localStorage.set('sector', result[0].sector);
          this.localStorage.set('id_tp_usuario', result[0].tipo);
          this.localStorage.set('email', result[0].email);
          this.localStorage.set('login', result[0].login);
          this.localStorage.set('create_at', result[0].create_at)
          this.localStorage.set('update_at', result[0].update_at)
          this.localStorage.set('birtday', result[0].birtday)
        }

        switch (result[0].tipo) {
          case 1:
            this.isUserValid = true
            this.isLoading = true;
            this.button = 'Processando';
            this.toastr.success('Você será redirecionado ao painel de controle', 'Acesso Liberado ')
            setTimeout(() => { this.router.navigate(['/painel']); }, 5000)

            break;

          case 2:
            this.isUserValid = true
            this.isLoading = true;
            this.button = 'Processando';
            this.toastr.success('Você será redirecionado ao painel de controle', 'Acesso Liberado ')
            setTimeout(() => { this.router.navigate(['/painel']); }, 5000)

            break;

          default:
            this.router.navigate(['/']);

            break;
        }
      },
      error => {
        this.isUserValid = false
        this.button = 'Processando';
        this.isLoading = true;
        if (error.status == 400 || error.status == 404) {
          this.toastr.warning('Usuario não encontrado', 'Dados Inválidos', {
            timeOut: 3000
          })
          this.isLoading = false;
          this.button = 'Acesse o Portal'
        }
        
        if (error.status == 401) {
          this.toastr.warning('Usuario não autorizado', 'Consulte o Administrador', {
            timeOut: 3000
          })
          this.isLoading = false;
          this.button = 'Acesse o Portal'
        }
        
        if (error.status == 500) {
          this.toastr.warning('Tente novamente mais tarde', 'O portal está fora do ar', {
            timeOut: 3000
          })
          this.isLoading = false;
          this.button = 'Acesse o Portal'
        }
        // console.log(error.)
        // this.isUserValid = false
        // this.isLoading = true;
        // this.button = 'Processando';
        // this.toastr.warning('Usuario ou senha estão incorretos', 'Dados Invalidos', {
        //   timeOut: 3000
        // })
        // this.isLoading = false;
        
      }
    );
  }

  SignUp() {
    this.user.create_at = new Date()
    this.user.update_at = new Date()

    this.authService.signUp(this.user).subscribe(
      result => {
        this.toastr.success('Aguarde a liberação de acesso pelo Administrador ', 'Cadastro Finalizado')
      },
      error => {
        this.toastr.warning('Tente novamente mais tarde', 'Sistema fora do ar ')
      }
    );


  }




}












