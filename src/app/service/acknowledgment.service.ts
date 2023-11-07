import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Acknowledgment[]>(this.url);
  }


  insert(ack: Acknowledgment) {
    return this.http.post(this.url, ack);
  }


  setList(listaNueva: Acknowledgment[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Acknowledgment>(`${this.url}/${id}`);
  }
  update(a: Acknowledgment) {
    return this.http.put(this.url, a);
  }
}
