import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { University } from '../model/university';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

private url = `${base_url}/university`

  private listaCambio = new Subject<University[]>()

  constructor(private http: HttpClient) { }
  

  list() {    
    return this.http.get<University[]>(this.url);
  }


  insert(uni: University) {
    return this.http.post(this.url, uni);
  }


  setList(listaNueva: University[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

}
