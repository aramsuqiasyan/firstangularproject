import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category.model";
import {Observable , throwError} from "rxjs";

@Injectable()
export class CategoriesService {
    constructor(public http: HttpClient) {
    }

    addCategory(category: Category) {
        return this.http.post('http://localhost:3000/categories', category);
    }

    getCategories(){
        return this.http.get('http://localhost:3000/categories')
    }


    updateCategory(category:Category){
        return this.http.put(`http://localhost:3000/categories/${category.id}`,category)
        // return  throwError("Error Message Here")
    }

}
