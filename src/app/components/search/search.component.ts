import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private router : Router){}

  doSearch(value: string){
    console.log("Our Value :"+value);// Visible in Chrome under Console, when we type something on Search
    this.router.navigateByUrl(`/search/${value}`);
  }
}
