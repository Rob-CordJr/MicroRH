
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UsuarioService } from '../services/usuario.service';



@Injectable({
    providedIn: 'root'
  })
export class ListUserResolver implements Resolve<User[]> {
    constructor(private usuarioService: UsuarioService, private router:Router) {}
    resolve( route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.usuarioService.getUsers()
    }
}
