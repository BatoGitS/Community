import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbInputModule, NbListModule,
  NbMenuModule,
  NbSpinnerModule,
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UserlistModule} from './userlist/userlist.module';
import {TechnologiesModule} from './technologies/technologies.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbActionsModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbListModule,
    UserlistModule,
    TechnologiesModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
