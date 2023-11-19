import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publication } from '../model/publication';
import { LogicUser } from '../model/logicuser';
import { InteractionUsersDTO } from '../model/InteractionUsersDTO';
const base_url = environment.base


@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  private url = `${base_url}/logicuser`

  private listaCambio = new Subject<LogicUser[]>()

  constructor(private http: HttpClient) { }
  

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<LogicUser[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(lu: LogicUser) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, lu, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: LogicUser[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<LogicUser>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(lu: LogicUser) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, lu, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getCountInteractionByUsers(): Observable<InteractionUsersDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<InteractionUsersDTO[]>(`${this.url}/interactions`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  registrarSecurity(enabled:boolean, password:string, username:string) {
    let token = sessionStorage.getItem('token');
    return this.http.post(`${this.url}/toSecurity`, 
      {
        enabled: enabled,
        password: password,
        username: username
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }



}
