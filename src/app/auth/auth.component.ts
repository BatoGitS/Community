import { Component } from '@angular/core';

import { MENU_ITEMS } from '../menu';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['auth.component.scss'],
  template: `
    <ngx-one-column-layout>
        <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AuthComponent {

  menu = MENU_ITEMS;
}
