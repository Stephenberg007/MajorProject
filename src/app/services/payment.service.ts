import { Injectable } from '@angular/core';
import { PaymentCallback } from '../dto/payment-callback';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private RAZORPAY_KEY = 'rzp_test_cHQkh9DNmQrv2t';
  constructor(private httpClient:HttpClient) { }

  processPayment(orderId: string, amount: number): void {

    const options: any = {
      key: this.RAZORPAY_KEY,
      amount: amount * 100,// converted to the smallest unit
      currency: 'INR',
      name: 'Aman Maurya',// company which is taking this paymnt
      description: 'Ecommerce order',// why are we taking this payment
      order_id: orderId,
      handler: (response: any) =>{
        if(response && response.razorpay_payment_id){
          const paymentPayload = {
            razorpayOrderId: orderId,
            razorpayPaymentId : response.razorpay_payment_id,
            razorpaySignature : response.razorpay_signature
          };
          console.log("Response :"+response);
          console.log("Payment Callback")
          this.paymentcallBack(paymentPayload);
        }
      },
      prefill: {
        name: 'Aman Maurya',
        email: 'krmauryaaman@gmail.com',
        contact: '9797979'
      },
      notes: {
        addres: 'Customer Address'

      },
      theme: {
        "color": "#3399cc"
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();

  }
  paymentcallBack(paymentCallBack : PaymentCallback) : void{
    console.log("Backend API Call For Payment Callback")
   this.httpClient.put<PaymentCallback>(AppConstants.PAYMENT_ENDPOINT,paymentCallBack)
   .subscribe({
      next:(response) => console.log("Payment CallBack Success: ", response),
      error :(error) => console.error("Payment callback failed:",error)
   });
  }

  

}
