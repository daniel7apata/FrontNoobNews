import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogicRol } from '../model/logicrol';
import { UserRoleDTO } from '../model/UserRoleDTO';
const base_url = environment.base


@Injectable({
  providedIn: 'root'
})
export class LogicrolService {

  private url = `${base_url}/logicrol`

  private listaCambio = new Subject<LogicRol[]>()

  constructor(private http: HttpClient) { }
  
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<LogicRol[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(rol: LogicRol) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, rol, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: LogicRol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<LogicRol>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(r: LogicRol) {
    return this.http.put(this.url, r);
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getUserByRole(): Observable<UserRoleDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<UserRoleDTO[]>(`${this.url}/logicusers`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
