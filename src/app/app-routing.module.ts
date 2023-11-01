import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { PublicationComponent } from './component/publication/publication.component';
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
