import { ApiService } from './servicios/api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './layouts/home/home.component';
import { Login2Component } from './user/login2/login2.component';
import { LoginComponent } from './user/login/login.component';
import  { ToastrModule  }  from  'ngx-toastr';
import { AdminComponent } from './admin/admin/admin.component' ;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    Login2Component,
    AdminComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
    ToastrModule.forRoot({
      progressBar:true
    })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
