import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Core/models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.url + "/Category";

  constructor(private http: HttpClient) { }
  
  registerCategory(category: Category): Observable<any> {
    return this.http.post<any>(this.url, category);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.url+'/search');
  }

  deleteCategory(id: string): Observable<any> {
    const options = {
      body: {
        categoryId: id
      }
    };
    return this.http.delete<any>(this.url, options);
  }

  editCategory(id: String, name: String): Observable<any> {
    const options = {
      categoryId: id,
      name:name,
    };
    return this.http.put<any>(this.url, options);
  }
}
