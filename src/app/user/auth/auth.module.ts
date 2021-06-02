import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { Login2Component } from './../login2/login2.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [Login2Component],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  exports:[
    Login2Component
  ]
})
export class AuthModule { }
