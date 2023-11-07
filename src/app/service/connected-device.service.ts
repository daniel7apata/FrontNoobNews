import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectedDevice } from '../model/connectedDevice';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ConnectedDeviceService {
  private url = `${base_url}/connectedDevice`

  private listaCambio = new Subject<ConnectedDevice[]>()

  constructor(private http: HttpClient) { }
  

  list() {
    return this.http.get<ConnectedDevice[]>(this.url);
  }


  insert(ext: ConnectedDevice) {
    return this.http.post(this.url, ext);
  }


  setList(listaNueva: ConnectedDevice[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<ConnectedDevice>(`${this.url}/${id}`);
  }
  update(a: ConnectedDevice) {
    return this.http.put(this.url, a);
  }
}
