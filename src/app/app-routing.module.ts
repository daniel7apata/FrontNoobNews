import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { PublicationComponent } from './component/publication/publication.component';
import { UsersComponent } from './component/users/users.component';
import { PublicationRegistrarComponent } from './component/publication-registrar/publication-registrar.component';
//PASO 15: aqui borraremos lo que ya no corresponde

const routes: Routes = [ 
  {
    path: 'homepage', component: HomepageComponent,
  },
  {
    path: 'configuracion/:id', component: ConfiguracionComponent,
  },
  {
    path: 'publicacion/:id', component: PublicationComponent,
  },
  {
    path: 'redactor/:id', component: UsersComponent,
  },
  {
    path: 'registrarPublicacion', component: PublicationRegistrarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
