import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../dto/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[]= [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  ngOnInit():void{
    this.listCartDetails();

  }

  constructor(private cartService: CartService){

  }

  listCartDetails(){
    this.cartItems=this.cartService.cartItems;
    // subscribe cart Price
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice=data
    );
    // subscribe total quantity

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.computeCartTotals();

  }
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  removeItem(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }

}
