import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit,OnDestroy {
    @Output() onCategoryAdd: EventEmitter<Category> = new EventEmitter();
    message: Message;

    subscription1:Subscription;

    constructor(
        private categoryService: CategoriesService
    ) {
    }

    ngOnInit() {
        this.message = new Message("success", '');
    }


    onSubmit(form: NgForm) {
        let {name, number} = form.value;
        if (number < 0) {
            number = number * (-1);
        }

        const category = new Category(name, number);

        this.subscription1 = this.categoryService.addCategory(category)
            .subscribe(
                (category: Category) => {
                    form.reset();
                    form.form.patchValue({
                        number: 1
                    });

                    // for success message
                        this.message.text = "Created Successfully";
                        setTimeout(() => {
                            this.message.text = '';
                        }, 5000)
                    // for success message

                    this.onCategoryAdd.emit(category);
                },
                error => {
                    // for error message
                        this.message.text = `${error}`;
                        this.message.type = 'danger';
                        setTimeout(() => {
                            this.message.text = '';
                        }, 5000);
                    // for error message

                }
            );
    }

    ngOnDestroy(): void {
        if(this.subscription1){
            this.subscription1.unsubscribe();
        }
    }

}
