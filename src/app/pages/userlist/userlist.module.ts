import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbActionsModule, NbCardModule, NbInputModule, NbListModule, NbSpinnerModule} from '@nebular/theme';
import {UserModule} from '../user/user.module';
import { ItemComponent } from './item/item.component';
import {TechnologyModule} from '../user/technology/technology.module';
import {UserlistComponent} from './userlist.component';
import {PagesRoutingModule} from "../pages-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UserlistComponent,
    ItemComponent,
  ],
  exports: [
    UserlistComponent,
    ItemComponent,
  ],
  imports: [
    TechnologyModule,
    CommonModule,
    NbListModule,
    UserModule,
    NbCardModule,
    NbSpinnerModule,
    NbActionsModule,
    NbInputModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class UserlistModule { }
