import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from "../shared/services/course.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {combineLatest, Subscription} from "rxjs";
import {Bill} from "../shared/models/bill.model";
import {Category} from "../shared/models/category.model";
import {APPEvent} from "../shared/models/app-event.model";

@Component({
    selector: 'app-planing',
    templateUrl: './planing.component.html',
    styleUrls: ['./planing.component.css']
})
export class PlaningComponent implements OnInit,OnDestroy {

    isLoaded = false;
    bill:Bill;
    categories:Category[] = [];
    ev:APPEvent[] = [];
    subscription:Subscription;

    constructor(
        private courseService: CourseService,
        private categoryService: CategoriesService,
        private eventsService: EventsService
    ) {
    }


    getCategoryCost(cat:Category):number{
        const catEvents = this.ev.filter((evt)=>{
           if(evt.category == cat.id && evt.type === 'outcome'){
               return evt;
           }
        });

        return catEvents.reduce((total,evt)=>{
            total += evt.amount;
            return total;
        },0);

    }

    private getPercent(cat:Category):number{
        const percent = (100 * this.getCategoryCost(cat)) / cat.number;
        return percent > 100 ? 100 : percent;
    }

    getCatPercent(cat:Category):string{
        return  this.getPercent(cat) + "%";
    }

    getCatColorClass(cat):string{
        const percent = this.getPercent(cat);
        return percent < 60 ? 'success' : percent >= 100 ? "danger" : "warning";
    }

    ngOnInit() {
        this.subscription = combineLatest(
            this.courseService.getBill(),
            this.categoryService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe((data:[Bill,Category[],APPEvent[]])=>{
            this.bill = data[0];
            this.categories = data[1];
            this.ev = data[2];
            this.isLoaded = true;
            console.log(data)
        })
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

}
