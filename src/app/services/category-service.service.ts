import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../app.constants';

export interface ProductCategory {
  categoryId: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
 
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(`${AppConstants.CATEGORY_ENDPOINT}`);
  }
}
