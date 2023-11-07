//PASO 4


//esto se puede copiar en el service de tu entidad
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base

//esto se debe crear dependiendo de tu entidad, va antes del     const base_url
import { Medicine } from '../model/medicine';

//como dato, las comillas raras se hacen con alt+96


@Injectable({
  providedIn: 'root'
})
export class MedicineService {


//todo esto tambien copialo
//aca deberás cambiar medicine por la ruta de tu entidad en el controlador del backend
  private url = `${base_url}/medicine`

//aca deberás cambiar medicine por el nombre de tu entidad, asegúrate que se referencie
  private listaCambio = new Subject<Medicine[]>()

  constructor(private http: HttpClient) { }
  
  //aca deberás cambiar medicine por el nombre de tu entidad, asegúrate que se referencie
  list() {    
    return this.http.get<Medicine[]>(this.url);
  }

  //aca deberás cambiar medicine por el nombre de tu entidad, asegúrate que se referencie, además cambia el parámetro cl por el que corresponda a tu entidad
  insert(me: Medicine) {
    return this.http.post(this.url, me);
  }

  //aca deberás cambiar medicine por el nombre de tu entidad, asegúrate que se referencie
  setList(listaNueva: Medicine[]) {
    this.listaCambio.next(listaNueva);
  }

  //aca deberás cambiar medicine por el nombre de tu entidad, asegúrate que se referencie
  getList() {
    return this.listaCambio.asObservable();
  }

  //PASO 5: ahora ve a app.module.ts

}
