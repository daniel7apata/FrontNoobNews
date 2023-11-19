import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Configuration } from '../model/configuration';
import { Category } from '../model/category';
import { PublicationCategoryDTO } from '../model/PublicationCategoryDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${base_url}/category`

  private listaCambio = new Subject<Category[]>()

  constructor(private http: HttpClient) { }
  
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Category[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(cate: Category) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, cate, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  setList(listaNueva: Category[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Category>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(c: Category) {
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getPublicationbyCategory(): Observable<PublicationCategoryDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<PublicationCategoryDTO[]>(`${this.url}/publication`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }



}
