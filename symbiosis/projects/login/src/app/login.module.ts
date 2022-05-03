import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "projects/common/src/app/common.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule {
}
