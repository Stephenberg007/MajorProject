import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [

    {path: 'category/:id', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'search/:keyword', component: ProductListComponent},
    {path:'cart-details', component: CartDetailsComponent},
    {path: 'checkout', component:CheckoutComponent},
    {path: 'order-confirmation', component:OrderConfirmationComponent},
    {path: 'login', component:LoginComponent}
];