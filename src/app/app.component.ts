import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from "./components/search/search.component";
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule, RouterModule, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aman Mega Mart';
  showLoginForm = false;

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;

}
}
