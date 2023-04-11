import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable, map, pluck, tap } from 'rxjs';
import { Contact } from '../models/Contact';
import { ContactService } from '../services/contact.service';
import { NgbdSortableHeader, SortEvent } from '../directives/sortable.directive';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  [x: string]: any;
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contactsSource$!: Observable<{ contacts: Contact[]; totalElements: number; }>;
  contacts$: Observable<Contact[]>;
  total$: Observable<number> | undefined;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;





  constructor(public service: ContactService) {
    this.contactsSource$ = this.service.getContact(this.currentPage, this.pageSize);
    this.contacts$ = this.contactsSource$.pipe(map(data => data.contacts));

  }



  ngOnInit(): void {
    this.contactsSource$.subscribe(data => {
      this.totalPages = Math.ceil(data.totalElements / this.pageSize);
      this.contactsSubject.next(data.contacts);
    });

    this.total$ = this.service.getContact(this.currentPage, this.pageSize).pipe(
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
    this.service.updateContact($event);
  }

  onDelete($event : any){
    this.service.deleteContact($event);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.contactsSource$ = this.service.getContact(this.currentPage, this.pageSize);
    this.contacts$ = this.contactsSource$.pipe(map(data => data.contacts));
    
  }


}
