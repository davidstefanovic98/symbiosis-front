import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SidebarComponent} from "../components/sidebar/sidebar.component";
import {MaterialModule} from "../../../material.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  providers: [],
  exports: [
    SidebarComponent
  ],
  bootstrap: [AppComponent]
})
export class CommonModule { }
