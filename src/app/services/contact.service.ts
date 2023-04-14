import { environment } from './../../environments/environment';
import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, debounceTime, delay, interval, map, of, switchMap, tap } from 'rxjs';
import { Contact } from '../models/Contact';
import { SortDirection } from '../directives/sortable.directive';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  contact: Contact[]
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

function sort(contact: Contact[], column: string, direction: string): Contact[] {
  if (direction === '') {
    return contact;
  } else {
    return [...contact].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(contact: Contact, term: string) {
  term = term ? term.toLowerCase() : '';
  
  
  return contact.nm_contact.toLowerCase().includes(term)
    || contact.nm_setor && contact.nm_setor.toLowerCase().includes(term)
    || contact.num_ramal && contact.num_ramal.toLowerCase().includes(term)
}



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  totalElements: any
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _contact$ = new BehaviorSubject<Contact[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  contacts: Contact[] = []

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };





  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe,

  ) {
    this.getContact(this.page, this.pageSize).subscribe(((contacts) => {
      this.contacts = contacts.contacts
    }))



    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe((result) => {

      this._contact$.next(result.contact);
      this._total$.next(result.total)
    });

    this._search$.next()

  }


  getContact(page: number, pageSize: number): Observable<{ contacts: Contact[], totalElements: number }> {

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;


    return this.http.get<Contact[]>(environment.apiUrl + 'contacts').pipe(
      map((data: Contact[]) => ({ contacts: data.slice(startIndex, endIndex), totalElements: data.length })),
      tap((data) => {
        this._contact$.next(data.contacts);
        this.page = page;
        this.pageSize = pageSize;
      })
    );

  }

  getContactById(id: Contact): Observable<Contact> {
    return this.http.get<Contact>(environment.apiUrl + 'contacts' + id)
  }

  updateContact(contact : Contact) : Observable<Contact>{
      return this.http.patch<Contact>(environment.apiUrl + 'contacts/' + contact._id, contact);
  }

  deleteContact(id : Contact) : Observable<Contact>{
    return this.http.delete<Contact>(environment.apiUrl + 'contacts' + id)
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

  get contact$() { return this._contact$.asObservable(); }
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
    let contacts = sort(this._contact$.getValue(), sortColumn, sortDirection);
  
    // 2. filter
    contacts = contacts.filter((contact) => matches(contact, searchTerm));
    
    // 3. paginate
    const total = contacts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    contacts = contacts.slice(startIndex, endIndex);


    return of({ contact: contacts, total: totalPages });
  }

 

  
}
