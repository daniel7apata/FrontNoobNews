import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectedDevice } from '../model/connected-device';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ConnectedDeviceService {

  private url = `${base_url}/connectedDevices`

  private listaCambio = new Subject<ConnectedDevice[]>()

  constructor(private http: HttpClient) { }
  
  list() {
    return this.http.get<ConnectedDevice[]>(this.url);
  }


  insert(conD: ConnectedDevice) {
    return this.http.post(this.url, conD);
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
  update(t: ConnectedDevice) {
    return this.http.put(this.url, t);
  }
}
