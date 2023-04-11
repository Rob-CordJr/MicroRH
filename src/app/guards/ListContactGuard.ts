
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactService } from '../services/contact.service';
import { Contact } from '../models/Contact';




@Injectable({
    providedIn: 'root'
  })
export class ListUserResolver implements Resolve<Contact[]> {
    constructor(private contactService : ContactService, private router:Router) {}
    resolve( route: ActivatedRouteSnapshot): Observable<Contact[]>{
        return this.contactService.getContact()
    }
}
