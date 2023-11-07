import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<ExternalPublication[]>(this.url);
  }


  insert(ext: ExternalPublication) {
    return this.http.post(this.url, ext);
  }


  setList(listaNueva: ExternalPublication[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<ExternalPublication>(`${this.url}/${id}`);
  }
  update(a: ExternalPublication) {
    return this.http.put(this.url, a);
  }
}
