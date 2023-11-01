import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Configuration } from '../model/configuration';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private url = `${base_url}/configuration`

  private listaCambio = new Subject<Configuration[]>()

  constructor(private http: HttpClient) { }
  
  list() {
    return this.http.get<Configuration[]>(this.url);
  }


  insert(conf: Configuration) {
    return this.http.post(this.url, conf);
  }


  setList(listaNueva: Configuration[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Configuration>(`${this.url}/${id}`);
  }
  update(t: Configuration) {
    return this.http.put(this.url, t);
  }


}
