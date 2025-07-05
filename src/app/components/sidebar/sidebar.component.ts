import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../dto/product-category';
import { CategoryService } from '../../services/category-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone : true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: ProductCategory[] = [];

  constructor(private categoryService: CategoryService,
                private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(res =>{
      
        this.categories = res.data;
        console.log(this.categories);
     
    });
  }
}
