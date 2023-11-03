//PASO 6

//de aca borra todo lo de la entidad Medicine

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import{MatNativeDateModule} from '@angular/material/core'
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { NoobnewsComponent } from './component/noobnews/noobnews.component';
import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UsersComponent } from './component/users/users.component';
import { PublicationComponent } from './component/publication/publication.component';
import { PublicationRegistrarComponent } from './component/publication-registrar/publication-registrar.component';
import { LoginComponent } from './component/login/login.component';
import { LatoolbarComponent } from './component/latoolbar/latoolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ConfiguracionComponent,
    NoobnewsComponent,
    UsersComponent,
    PublicationComponent,
    PublicationRegistrarComponent,
    LoginComponent,
    LatoolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
