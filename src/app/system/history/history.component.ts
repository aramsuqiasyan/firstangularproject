import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {combineLatest, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {APPEvent} from "../shared/models/app-event.model";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    isLoaded = false;
    categories: Category[] = [];
    events: APPEvent[] = [];
    chartData = [];

    constructor(
        private categoryService: CategoriesService,
        private eventsService: EventsService
    ) {
    }

    calculateChartData(): void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvents = this.events.filter((evt) => {
                if (evt.category == cat.id && evt.type == 'outcome') {
                    return evt;
                }
            });
            this.chartData.push({
                name: cat.name,
                value: catEvents.reduce((total, evt) => {
                    total += evt.amount;
                    return total;
                }, 0)
            })
        })
    }

    ngOnInit() {
        this.subscription = combineLatest(
            this.categoryService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe((data: [Category[], APPEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];

            this.calculateChartData();

            this.isLoaded = true;
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
