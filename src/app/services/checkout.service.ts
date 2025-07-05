import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchaseorder } from '../dto/purchaseorder';
import { AppConstants } from '../../app.constants';
import { Observable } from 'rxjs';
import { PaymentCallback } from '../dto/payment-callback';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor( private httpClient: HttpClient) { }

placeOrder(purchase: Purchaseorder) : Observable<any>{
  return this.httpClient.post<Purchaseorder>(AppConstants.ORDER_ENDPOINT,purchase);
}


}
