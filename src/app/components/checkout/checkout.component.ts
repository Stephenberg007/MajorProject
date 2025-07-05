import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Order } from '../../dto/order';
import { Orderitems } from '../../dto/orderitems';
import { Purchaseorder } from '../../dto/purchaseorder';
import { CheckoutService } from '../../services/checkout.service';
import { Address } from '../../dto/address';
import { PaymentService } from '../../services/payment.service';
import { PaymentCallback } from '../../dto/payment-callback';

@Component({
  selector: 'app-checkout',
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  razorpayOrderId:string ="";

  constructor(private formBuilder: FormBuilder, 
            private cartService: CartService,
            private checkoutService: CheckoutService,
            private paymentService:PaymentService,
            private router: Router
          ) { }

  ngOnInit(): void {
    this.reviewCartDetails()

    this.checkoutFormGroup = this.formBuilder.group({
      
      customer: this.formBuilder.group({
        name: [''],
        email: [''],
        phoneNo: ['']
      }),

      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        houseNum: [''],
        zipcode: ['']
      }),
    })   

  }


  get getName() { return this.checkoutFormGroup.get('customer.name'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phno() { return this.checkoutFormGroup.get('customer.phoneNo'); }

  get addressStreet() { return this.checkoutFormGroup.get('address.street'); }
  get addressCity() { return this.checkoutFormGroup.get('address.city'); }
  get addressState() { return this.checkoutFormGroup.get('address.state'); }
  get addressZipcode() { return this.checkoutFormGroup.get('address.zipcode'); }
  get addressHouseNum() { return this.checkoutFormGroup.get('address.houseNum'); }


  onSubmit() {

    // setup order
    let order = new Order(this.totalQuantity, this.totalPrice);


    // setup order items
    const cartItems = this.cartService.cartItems;
    let orderItems: Orderitems[] = cartItems.map(tempCartItem => new Orderitems(tempCartItem.imageUrl!, tempCartItem.unitPrice!, tempCartItem.quantity, tempCartItem.productId!));


    // setup purchase  order
    let purchase = new Purchaseorder();

    // set customer data to purchase order
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // set address data to purchase order
    purchase.address = this.checkoutFormGroup.controls['address'].value;

    // set order
    purchase.order = order;

    // set order items 
    purchase.orderItems = orderItems;

    // make backend api call

    this.checkoutService.placeOrder(purchase).subscribe(response => {
      const responseData = response.data;
      console.log("Component Response :"+JSON.stringify(response));
      this.razorpayOrderId = responseData.razorpayOrderId;
      this.paymentService.processPayment(responseData.razorpayOrderId,this.totalPrice);
                            
                            
                            
                            
                            
      
      this.cartService.clearCart();     
       this.router.navigateByUrl('/order-confirmation');
    })

  }
  

  reviewCartDetails(){
    // subscribe to Toal Quantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity= totalQuantity

    );

    // subscribe to totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    )
  }


}
