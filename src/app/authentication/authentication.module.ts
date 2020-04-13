import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AUTH_CONFIG} from './configure';
import {environment} from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: AUTH_CONFIG, useValue: environment.auth}
  ]
})
export class AuthenticationModule { }
