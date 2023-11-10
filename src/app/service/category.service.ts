import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private url = `${base_url}/category`

  private listaCambio = new Subject<Category[]>()

  constructor(private http: HttpClient) { }

  list() {    
    return this.http.get<Category[]>(this.url);
  }

  insert(uni: Category) {
    return this.http.post(this.url, uni);
  }


  setList(listaNueva: Category[]) {
    this.listaCambio.next(listaNueva);
  }


  getList() {
    return this.listaCambio.asObservable();
  }









}
