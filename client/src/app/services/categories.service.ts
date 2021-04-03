import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Category} from '../interfaces/interfaces';
import {Message} from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  //Get all gategories
  fetch(): Observable<Category[]>{
    return this.http.get<Category[]>('/api/category');
  }

  //Get category by ID
  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(name: string, image?: File): Observable<Category>{
    const formData = new FormData();

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('name', name);

    //Save date in server
    return this.http.post<Category>('/api/category', formData);
  }

  update(id: any, name: string, image?: File): Observable<Category>{
    const formData = new FormData();

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('name', name);

    console.log(formData);

    //Save date in server
    return this.http.patch<Category>(`/api/category/${id}`, formData);
  }

  delete(id): Observable<Message>{
    return this.http.delete<Message>(`/api/category/${id}`);
  }
}
