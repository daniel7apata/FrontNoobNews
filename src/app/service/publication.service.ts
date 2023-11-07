import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publication } from '../model/publication';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url = `${base_url}/publication`

  private listaCambio = new Subject<Publication[]>()

  constructor(private http: HttpClient) { }
  

  list() {
    return this.http.get<Publication[]>(this.url);
  }


  insert(pub: Publication) {
    return this.http.post(this.url, pub);
  }


  setList(listaNueva: Publication[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Publication>(`${this.url}/${id}`);
  }
  update(t: Publication) {
    return this.http.put(this.url, t);
  }

}
