import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TechnologyComponent} from './technology.component';
import {NbActionsModule, NbBadgeModule, NbButtonModule, NbCardModule, NbTooltipModule} from '@nebular/theme';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [TechnologyComponent, ActionsComponent],
  imports: [
    CommonModule,
    NbBadgeModule,
    NbButtonModule,
    NbTooltipModule,
    NbActionsModule,
    NbCardModule,
  ],
  exports: [TechnologyComponent, ActionsComponent],
})
export class TechnologyModule { }
