import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AdminComponent} from './admin/admin.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {MaterialModule} from "../../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {CommonModule} from "../../../common/src/app/common.module";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AdminModule {
}
