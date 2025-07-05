import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../../app.constants';
import { Product } from '../dto/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) {

   }
   getAllProducts():Observable<any>{
    return this.http.get<any>(`${AppConstants.PRODUCTS_ENDPOINT}`);
    console.log(`${AppConstants.PRODUCTS_ENDPOINT}`);
   }
   getProductsByCategoryId(theCategoryId: number): Observable<any> {
    return this.http.get<any>(`${AppConstants.PRODUCTS_ENDPOINT}/${theCategoryId}`);
  }
  getAllCategories():Observable<any>{
    return this.http.get<any>(`${AppConstants.CATEGORY_ENDPOINT}`)
  }
  searchProducts(theKeyword: string): Observable<any>{
    return this.http.get<any>(`${AppConstants.PRODUCTS_SEARCH_ENDPOINT}/${theKeyword}`);

  }

}
