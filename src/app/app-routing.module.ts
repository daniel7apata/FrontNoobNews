import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { PublicationComponent } from './component/publication/publication.component';
import { UsersComponent } from './component/users/users.component';
import { PublicationRegistrarComponent } from './component/publication-registrar/publication-registrar.component';
import { LoginComponent } from './component/login/login.component';
import { SearchComponent } from './component/search/search.component';
import { RegisterComponent } from './component/register/register.component';
//PASO 15: aqui borraremos lo que ya no corresponde

const routes: Routes = [
  {
    path: 'inicio/:logued', component: HomepageComponent,
  },
  {
    path: 'configuracion/:idconfig', component: ConfiguracionComponent,
  },
  {
    path: 'publicacion/:id', component: PublicationComponent,
  },
  {
    path: 'redactor/:id', component: UsersComponent,
  },
  {
    path: 'registrarPublicacion/:id', component: PublicationRegistrarComponent,
  },
  {
    path: 'buscar/:palabra', component: SearchComponent,
  },
  {
    path: 'registro', component: RegisterComponent,
  },
  {
    path: 'login', component: LoginComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
