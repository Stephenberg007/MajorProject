import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { Orderitems } from "./orderitems";

export class Purchaseorder {

    customer!: Customer;

    address!: Address;

    order!: Order;

    orderItems!: Orderitems[]
}