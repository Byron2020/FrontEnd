import { AdminComponent } from './admin/admin/admin.component';
import { Login2Component } from './user/login2/login2.component';
import { HomeComponent } from './layouts/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'login2',component:Login2Component},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
