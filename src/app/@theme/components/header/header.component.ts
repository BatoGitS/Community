import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { Subject } from 'rxjs';
import {AuthService} from '../../../@core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    const { xl } = this.breakpointService.getBreakpointsMap();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.router.navigate(['/']);
    return false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getMyId(): string {
    return this.authService.CurrentId();
  }

  logout() {
    if (this.authService.isLoggedIn())
      this.authService.logout();
    else
      this.router.navigate(['/auth/login']);
    return false;
  }

}
