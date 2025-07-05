import { Injectable } from '@angular/core';
import { CartItem } from '../dto/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);


  cartItems:CartItem[]=[];
  constructor() { }

addToCart(theCartItem: CartItem){
  let alreadyExistingInCart: boolean = false;
  let existingCartItem!:CartItem;
  if(this.cartItems.length>0){// here >0 means some item is available in the CART
    // check item presence in Cart based on item id
    for( let tempCartItem of this.cartItems){
      if(tempCartItem.productId===theCartItem.productId){
            existingCartItem = tempCartItem;
            alreadyExistingInCart=true;
            break;
      }
    }

  }
  if(alreadyExistingInCart){
    existingCartItem.quantity++;
  }else{
    this.cartItems.push(theCartItem);
  }
  this.computeCartTotals();

}
// now we want to calculate Total value and quantity in cart
computeCartTotals() {

  let totalPriceValue: number = 0;
  let totalQuantityValue: number = 0;

  for (let currentCartItem of this.cartItems) {
    totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
    totalQuantityValue += currentCartItem.quantity;
  }

  // publish new values for all subscribers

  this.totalPrice.next(totalPriceValue);// for ensuring Change is being reflected in the GLOBAL Variables
  this.totalQuantity.next(totalQuantityValue);
}
decrementQuantity(theCartItem: CartItem) {
  theCartItem.quantity--;
  if (theCartItem.quantity == 0) {
    this.remove(theCartItem);
  } else {
    this.computeCartTotals();
  }
}

remove(theCartItem: CartItem) {
  // get index of item in the array
  const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.productId === theCartItem.productId);
  if(itemIndex > -1){
    this.cartItems.splice(itemIndex, 1);
    this.computeCartTotals();
  }
}

clearCart(){
  this.cartItems=[];
  this.computeCartTotals();
}

}
