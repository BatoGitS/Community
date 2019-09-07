import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule, NbContextMenuModule, NbIconModule, NbInputModule,
  NbSelectModule,
  NbTooltipModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {UserService} from '../../@core/service/users.service';
import {TechnologyModule} from './technology/technology.module';
import { WrapperComponent } from './wrapper/wrapper.component';
import {TechnologiesModule} from "../technologies/technologies.module";
import {UserComponent} from "./user.component";
import {FormsModule} from "@angular/forms";
@NgModule({
  providers: [UserService],
  declarations: [WrapperComponent, UserComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbBadgeModule,
    NbSelectModule,
    NbActionsModule,
    NbButtonModule,
    NbTooltipModule,
    NbContextMenuModule,
    TechnologyModule,
    TechnologiesModule,
    FormsModule,
    NbInputModule,
    NbIconModule,
  ],
  entryComponents: [WrapperComponent],
  exports: [
  ],
})
export class UserModule { }
