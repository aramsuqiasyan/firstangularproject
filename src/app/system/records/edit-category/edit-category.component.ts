import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {
    subscription1:Subscription;
    @Input() categories: Category[];
    @Output() onCategoryEdit: EventEmitter<Category> = new EventEmitter();
    currentCategoryId = 1;
    currentCategory: Category;
    message: Message;
    constructor(private categoryService: CategoriesService) {}
    ngOnInit() {
        this.message = new Message('success', '');
        this.onCategoryChange();
    }
    onSubmit(form: NgForm) {
        let {name, number} = form.value;
        if (number < 0) {
            number = number * (-1);
        }

        const category = new Category(name, number, +this.currentCategoryId);

        this.subscription1 = this.categoryService.updateCategory(category)
            .subscribe(
                (category: Category) => {
                    this.onCategoryEdit.emit(category);
                    // for success message
                        this.message.text = "Updated Successfully";
                        setTimeout(() => {
                            this.message.text = "";
                        }, 5000);
                    // for success message
                },
                error => {
                    // for error message
                        this.message.text = `${error}`;
                        this.message.type = 'danger';
                        setTimeout(() => {
                            this.message.text = "";
                        }, 5000);
                    // for error message
                }
            )
    }
    onCategoryChange() {
        this.currentCategory = this.categories.find((cat) => {
            if (cat.id === +this.currentCategoryId) {
                return cat
            }
        })
    }
    ngOnDestroy(): void {
        if(this.subscription1){
            this.subscription1.unsubscribe();
        }
    }

}
