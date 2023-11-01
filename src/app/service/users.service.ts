import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publication } from '../model/publication';
import { Users } from '../model/users';
const base_url = environment.base


@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  private url = `${base_url}/user`

  private listaCambio = new Subject<Users[]>()

  constructor(private http: HttpClient) { }
  

  list() {
    return this.http.get<Users[]>(this.url);
  }


  insert(us: Users) {
    return this.http.post(this.url, us);
  }


  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }
  update(u: Users) {
    return this.http.put(this.url, u);
  }

}
