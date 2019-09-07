import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TechnologiesComponent} from './technologies.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbTooltipModule,
} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import { AddtechnologyComponent } from './addtechnology/addtechnology.component';
import {ActionsComponent} from "../user/technology/actions/actions.component";

@NgModule({
  declarations: [TechnologiesComponent, AddtechnologyComponent],
  imports: [
    NbDialogModule.forChild(),
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    ReactiveFormsModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
  ],
  entryComponents: [
    AddtechnologyComponent,
    ActionsComponent,
  ],
  exports: [
    TechnologiesComponent
  ]
})
export class TechnologiesModule { }
