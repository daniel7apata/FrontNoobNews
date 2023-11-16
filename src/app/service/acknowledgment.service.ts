import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Acknowledgment } from '../model/acknowledgment';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class AcknowledgmentService {

  private url = `${base_url}/acknowledgment`

  private listaCambio = new Subject<Acknowledgment[]>()

  constructor(private http: HttpClient) { }
  

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Acknowledgment[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(ack: Acknowledgment) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, ack, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: Acknowledgment[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Acknowledgment>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(ack: Acknowledgment) {
    return this.http.put(this.url, ack);
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
