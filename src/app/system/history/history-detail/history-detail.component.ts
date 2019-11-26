import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {APPEvent} from "../../shared/models/app-event.model";
import {mergeMap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit,OnDestroy {
    subscription:Subscription;

    isLoaded = false;
    evt:APPEvent;

    constructor(
        private route: ActivatedRoute,
        private eventsService: EventsService
    ) {
    }

    ngOnInit() {
        this.route.params
            .pipe(
                mergeMap((params)=>{
                    return this.eventsService.getEventById(params.id);
                })
            )
            .subscribe((evt:APPEvent)=>{
                this.evt = evt;
                this.isLoaded = true;
            })
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
