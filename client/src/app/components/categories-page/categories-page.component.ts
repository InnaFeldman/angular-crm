import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  // categories: Category[] = [];
  //or
  categories$!: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();

    //Or
    // this.categoriesServer.fetch().subscribe(
    //   categories => {
    //     this.categories = categories; // Put into var categories all that was came from server
    //     //console.log('categories', categories)
    //   })
  }

}
