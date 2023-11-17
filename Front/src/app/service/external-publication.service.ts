import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExternalPublication } from '../model/externalPublication';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ExternalPublicationService {

  private url = `${base_url}/externalPublication`

  private listaCambio = new Subject<ExternalPublication[]>()

  constructor(private http: HttpClient) { }
  

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<ExternalPublication[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(extp: ExternalPublication) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, extp, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: ExternalPublication[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<ExternalPublication>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(ex: ExternalPublication) {
    return this.http.put(this.url, ex);
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
