
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { map, Observable, shareReplay } from 'rxjs';
import { User } from '../models/User';
import { sideNavAnimation, sideNavContainerAnimation } from './sidebar-animations';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  animations: [sideNavAnimation, sideNavContainerAnimation]
})



export class MainNavComponent implements OnInit {
  // @ViewChild("sidenav") sidenav: ElementRef | any;
  @ViewChild('sidenav') sidenav: MatSidenav | any;
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
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.user.nm_usuario = 'Roberto dos Santos'

  }

  toggle() {
     this.isOpen = !this.isOpen;
   }
 
  // mouseenter() {
  //   if (!this.isExpanded) {
  //     this.isShowing = true;
  //   }
  // }

  // mouseleave() {
  //   if (!this.isExpanded) {
  //     this.isShowing = false;
  //   }
  // }

 

  logout(){}

}
