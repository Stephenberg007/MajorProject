import { Product } from "./product"

export class CartItem {
     productId: number;
     productname: string;
     imageUrl: string;
     unitPrice: number;
     quantity: number;

  constructor( product : Product){
   this.productId=product.productId;
   this.productname=product.prodName;
   this.imageUrl=product.imageUrl;
   this.unitPrice=product.unitPrice;
   this.quantity=1;
}
}
