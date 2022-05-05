import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminUsersComponent} from "./admin-users/admin-users.component";

const routes: Routes = [
  {
    path: "users",
    component: AdminUsersComponent
  },
  {
    path: "**",
    redirectTo: '',
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
