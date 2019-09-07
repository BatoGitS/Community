import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbMenuModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../@theme/theme.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    NbCardModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class AuthModule { }
