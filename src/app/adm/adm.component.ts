import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../directives/sortable.directive';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../models/User';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {

  [x: string]: any;
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;
  private usersSubject = new BehaviorSubject<User[]>([]);
  usersSource$!: Observable<{ user: User[]; totalElements: number; }>;
  users$!: Observable<User[]>;
  total$!: Observable<number>;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;


  constructor(public service : UsuarioService) {
    this.usersSource$ = this.service.getUsers(this.currentPage, this.pageSize);
    this.users$ = this.usersSource$.pipe(map(data => data.user));
   }

  ngOnInit(): void {

    this.usersSource$.subscribe(data => {
      this.totalPages = Math.ceil(data.totalElements / this.pageSize);
      this.usersSubject.next(data.user);
    });

    this.total$ = this.service.getUsers(this.currentPage, this.pageSize).pipe(
      map(data => data.totalElements)
    )

  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onUpdate($event : any){
    this.service.updateUser($event);
  }

  onDelete($event : any){
    this.service.deleteUser($event);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.usersSource$ = this.service.getUsers(this.currentPage, this.pageSize);
    this.users$ = this.usersSource$.pipe(map(data => data.user));
    
  }


}
