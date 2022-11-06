import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from '../models/User';

export interface PeriodicElement {
  data: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { data: '20/04/2020', position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { data: '20/04/2020', position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { data: '20/04/2020', position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { data: '20/04/2020', position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { data: '20/04/2020', position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { data: '20/04/2020', position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { data: '20/04/2020', position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { data: '20/04/2020', position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { data: '20/04/2020', position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { data: '20/04/2020', position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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
  users: User[] | any;
  dataSource = ELEMENT_DATA;
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


  // applyFilterGlobal($event : any, stringVal : any) {
  //   this.dt.filterGlobal($event, stringVal);
  // }

  target(event: Event): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }



  openNew() {
    this.users = {};
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

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.nm_usuario + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.user = this.user.filter((val: { id: number | undefined; }) => val.id !== user.id_usuario);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario excluido', life: 3000 });
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
      if (this.users[i].id_usuario === id) {
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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000 });
      }
      else {
        this.user.id = this.createId();
        this.user.image = 'user-placeholder.svg';
        this.users.push(this.user);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }






}


