import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../dto/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{
  productCategories: ProductCategory[]=[];

constructor(private productService: ProductService){}

ngOnInit():void{
  this.getAllCategories();
}

getAllCategories(){
  this.productService.getAllCategories().subscribe(res =>{
    this.productCategories=res.data;

  })
}

}
