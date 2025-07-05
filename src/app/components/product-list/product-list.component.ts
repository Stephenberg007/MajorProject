import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../dto/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../dto/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products:any[]=[];
  currentCategoryId=1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
            private route:ActivatedRoute,
            private cartService:CartService
  ){

  }
  ngOnInit(): void{
    this.route.paramMap.subscribe( () =>{
      this.listProducts();
    })
      
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.getAllProducts();
    }
  }
  getAllProducts(){
    // we r checking if id parameter is available
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has("id");
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    }else{
      this.currentCategoryId=1;
    }
this.productService.getProductsByCategoryId(this.currentCategoryId).subscribe(res => {
    this.products=res.data;
})
  }

  handleSearchProducts(){// for items typed on Search Bar
  const theKeyword:string =  this.route.snapshot.paramMap.get("keyword")!;
  this.productService.searchProducts(theKeyword).subscribe(res =>{
    this.products= res.data;
  })
  }

  addToCart(theProduct: Product){// written so that when we press 'addtocart' BUTTON then item is added to Cart
     
    console.log(`Addinig To Cart : ${theProduct.prodName},${theProduct.unitPrice}`);
    const theCartItem= new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);
  }


    }
  


