import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from '../models/User';


@Component({
  selector: 'app-adm-usuario',
  templateUrl: './adm-usuario.component.html',
  styleUrls: ['./adm-usuario.component.scss']
})
export class AdmUsuarioComponent implements OnInit {
  @ViewChild('dt') dt: Table | any;
  userDialog: boolean | any;
  selectedUsers: User[] | any;
  submitted: boolean | any;
  users: User[] = [];

  user: User | any;
  value: string | any;
  showLinkedRisksOnly: boolean = true;
  condition: boolean = true;
  setores: any = [{ id: 1, name: 'COPLAN' }]
  perfis: any = [{ id: 1, name: 'Administrador' }, { id: 2, name: 'Acesso Restrito' }]

  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService, private cd: ChangeDetectorRef) { }






  ngOnInit(): void {
    this.user = this.route.snapshot.data['userAlls'];

  }



  target(event: Event): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }



  openNew() {
    this.users = [{ ...this.user }];
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que vai excluir os usuarios selecionados?',
      header: 'Confirme',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter((val: any) => !this.selectedUsers.includes(val));
        this.selectedUsers = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios deletados', life: 3000 });
      }
    });
  }

  editUser(id_usuario: any) {

    this.userDialog = true
    var userFound = null

    Object.values(this.user).map((campo, i) => {
      console.log(this.user[i])
      if (this.user[i]._id === id_usuario) userFound = campo
    })

    this.user = userFound
   
    return this.user





  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que vai deletar ' + user.nm_usuario + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.user = this.user.filter((val: { id: number | undefined; }) => val.id !== user._id);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuario excluido', life: 3000 });
      }
    });

  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  saveUser() {
    this.submitted = true;

    if (this.user.name.trim()) {
      if (this.user.id) {
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Os dados deste usuario foram atualizados', life: 3000 });
      }
      else {
        this.user.id = this.createId();
        this.user.image = 'user-placeholder.svg';
        this.users.push(this.user);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuario criado com sucesso', life: 3000 });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }






}


