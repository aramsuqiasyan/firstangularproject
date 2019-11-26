import {Component, OnInit} from '@angular/core';
import {Category} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
    categories:Category[] = [];
    isLoaded = false;
    constructor(
        private categoryService:CategoriesService
    ) {
    }

    ngOnInit() {
        this.categoryService.getCategories()
            .subscribe((categories:Category[])=>{
                this.categories = categories;
                this.isLoaded = true
            })
    }

    onCategoryAdd(category:Category) {
        this.categories.push(category);
    }

    onCategoryEdit(category:Category){
        const index = this.categories
            .findIndex((c)=> category.id === c.id);
        this.categories[index] = category;
    }
}
