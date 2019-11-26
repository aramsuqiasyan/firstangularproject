import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {APPEvent} from "../../shared/models/app-event.model";

@Component({
    selector: 'app-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {

    @Input() categories: Category[];
    @Input() events: APPEvent[];

    filterTitle = 'Amount';
    searchValue:string = "";
    critery:string = 'amount';

    constructor() {
    }

    capitalize(str:string){
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }

    // filter dynamic

    changeCritery(filed:string) {
        this.filterTitle = this.capitalize(filed);
        this.critery = filed;

        if(filed == 'category'){
            this.critery = 'catName';
        }

    }

    // filter dynamic

    ngOnInit() {
        if (this.events.length) {
            this.events.forEach((evt) => {
                evt.catName = this.categories.find((c) => c.id === evt.category).name
            });
        }
    }

}
