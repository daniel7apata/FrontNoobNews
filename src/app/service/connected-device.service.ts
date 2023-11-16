import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem('token');
    return this.http.get<ConnectedDevice[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(conn: ConnectedDevice) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, conn, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: ConnectedDevice[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<ConnectedDevice>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(t: ConnectedDevice) {
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
