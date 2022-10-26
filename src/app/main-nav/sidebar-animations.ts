import {
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';


 export const sideNavAnimation = trigger('openCloseSidenav',[
    state('open', style({
        width: '200px'
    })),
    state('closed', style({
        width: '60px'
    })),
    transition('open <=> closed', [
        animate('0.3s')
    ])
 ]);

 export const sideNavContainerAnimation = trigger('openCloseSidenavContent', [
    state('open', style({
      'margin-left': '201px',
    })),
    state('closed', style({
      'margin-left': '61px',
    })),
    transition('open <=> closed', [
      animate('0.3s')
    ]),
  ]);