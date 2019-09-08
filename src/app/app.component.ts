/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {AuthService} from './@core/service/auth.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private analytics: AnalyticsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();
      this.authService.connectToHub();
    }
    this.analytics.trackPageViews();
  }
  ngOnDestroy() {
    this.authService.disconnectFromHub();
  }
}
