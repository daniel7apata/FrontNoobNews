import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem('token');
    return this.http.get<Publication[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(pub: Publication) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, pub, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: Publication[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Publication>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(t: Publication) {
    return this.http.put(this.url, t);
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


}
