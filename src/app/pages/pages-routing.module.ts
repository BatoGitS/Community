import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {UserComponent} from './user/user.component';
import {UserlistComponent} from './userlist/userlist.component';
import {TechnologiesComponent} from './technologies/technologies.component';

const routes: Routes = [


  {
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'user/:id', component: UserComponent,
    },
    {
      path: 'technologies', component: TechnologiesComponent,
    },
    {
      path: 'users',
      children: [
        {path: '', pathMatch: 'full', component: UserlistComponent},
        {path: ':page', component: UserlistComponent},
        ],
    },
    {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
