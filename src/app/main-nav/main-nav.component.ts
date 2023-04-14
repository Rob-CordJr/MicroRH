
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { User } from '../models/User';
import { sideNavAnimation, sideNavContainerAnimation } from './sidebar-animations';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css', './main-nav.component.scss'],
  animations: [sideNavAnimation, sideNavContainerAnimation]
})



export class MainNavComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav | any;
  userType: number = 2
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isOpen: boolean = false;
  showSubSubMenu: boolean = false;
  isImageLoading: boolean = false;
  imageToShow: any;
  face: any;
  user = new User();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()

    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private renderer : Renderer2
  ) {

  }

  ngAfterViewInit(): void {

    this.renderer.setStyle(this.sidenav._content.nativeElement,  'scrollbar-width', 'none')
  }

  ngOnInit(): void {
    // this.user.nm_usuario = 'Roberto dos Santos'

  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.router.navigate(['/']);
  }

  isPerfil() {
    if (this.userType == 1) {
      return 'Administrador'
    } else if (this.userType == 2) {
      return 'RH'
    }

    return false
  }





}
