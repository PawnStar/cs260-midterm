import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { UserPage } from './userPage/userPage';
import { AdminPage } from './adminPage/adminPage';

const appRoutes: Routes = [
  {path: 'admin', component: AdminPage },
  {path: '', component: UserPage }
]

@NgModule({
  declarations: [
    AppComponent,
    UserPage,
    AdminPage
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
