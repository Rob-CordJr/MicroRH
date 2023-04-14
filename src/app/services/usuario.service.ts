import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, map, of, switchMap, tap } from 'rxjs';
import { User } from '../models/User';
import { SortDirection } from '../directives/sortable.directive';
import { Contact } from '../models/Contact';

interface SearchResult {
  user: User[]
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1: any, v2: any) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(user: User[], column: string, direction: string): User[] {
  if (direction === '') {
    return user;
  } else {
    return [...user].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: User, term: string) {
  term = term ? term.toLowerCase() : '';


  return user.nm_usuario.toLowerCase().includes(term)
    || user.nm_usuariosobrenome && user.nm_usuariosobrenome.toLowerCase().includes(term)
    || user.sector && user.sector.toLowerCase().includes(term)
}





@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  totalElements: any
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _user$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  users: User[] = []

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };



  redirectUrl: string | undefined;

  errorHand: any;


  constructor(
    private http: HttpClient,
  ) {

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe((result) => {

      this._user$.next(result.user);
      this._total$.next(result.total)
    });

    this._search$.next()

  }


  getUsers(page: number, pageSize: number): Observable<{ user: User[], totalElements: number }> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return this.http.get<User[]>(environment.apiUrl + 'usuarios').pipe(
      map((data: User[]) => ({ user: data.slice(startIndex, endIndex), totalElements: data.length })),
      tap((data) => {
        this._user$.next(data.user);
        this.page = page;
        this.pageSize = pageSize;
      })
    );
  }

  getUserById(id: User): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'usuarios' + id)
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(environment.apiUrl + 'usuarios/' + user._id, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(environment.apiUrl + 'usuarios/' + user._id);
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

  get user$() { return this._user$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    // let contacts = this._contact$.getValue();



    // 1. sort
    let users = sort(this._user$.getValue(), sortColumn, sortDirection);

    // 2. filter
    users = users.filter((contact : any) => matches(contact, searchTerm));

    // 3. paginate
    const total = users.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    users = users.slice(startIndex, endIndex);


    return of({ user: users, total: totalPages });
  }





}


