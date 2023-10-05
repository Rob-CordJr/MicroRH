import { environment } from './../../environments/environment';
import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, debounceTime, delay, distinctUntilChanged, interval, map, of, switchMap, tap } from 'rxjs';
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
  return (contact.nm_contact && contact.nm_contact.toLowerCase().indexOf(term) === 0)
    || (contact.nm_setor && contact.nm_setor.toLowerCase().indexOf(term) === 0)
    || (contact.num_ramal && contact.num_ramal.toLowerCase().indexOf(term) === 0)
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



    // this._search$.pipe(
    //   tap(() => this._loading$.next(true)),
    //   debounceTime(200),
    //   switchMap(() => this._search()),
    //   delay(200),
    //   tap(() => this._loading$.next(false))
    // ).subscribe((result) => {
    //   this._contact$.next(result.contact);
    //   this._total$.next(result.total)
    // });

    this._search$
      .pipe(
        debounceTime(300), // Espere 300ms após a última digitação
        distinctUntilChanged(), // Verifique se o termo de pesquisa mudou
        switchMap(() => this._search())
      )
      .subscribe((result) => {
        this._contact$.next(result.contact);
        this._total$.next(result.total);
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

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(environment.apiUrl + 'contacts/' + contact._id, contact);
  }

  deleteContact(id: Contact): Observable<Contact> {
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

    // // 1. filter
    // let contacts = this._contact$.getValue().filter((contact: Contact) => matches(contact, searchTerm));



    // // 2. sort
    // contacts = sort(contacts, sortColumn, sortDirection);

    // // 3. paginate
    // const total = contacts.length;
    // const startIndex = (this.page - 1) * this.pageSize;
    // const endIndex = Math.min(startIndex + this.pageSize, total);
    // contacts = contacts.slice(startIndex, endIndex);


    // ...
    // 1. filter
    let filteredContacts = this._contact$.getValue().filter((contact: Contact) => matches(contact, searchTerm));

    // 2. paginate
    const total = filteredContacts.length;
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, total);
    filteredContacts = filteredContacts.slice(startIndex, endIndex);

    // 3. sort
    filteredContacts = sort(filteredContacts, sortColumn, sortDirection);

    return of({ contact: filteredContacts, total: total });



    // return of({ contact: contacts, total: total });
  }




}
