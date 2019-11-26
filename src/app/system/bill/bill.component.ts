import {Component, OnDestroy, OnInit} from '@angular/core';

import {CourseService} from "../shared/services/course.service";
import {combineLatest, Subscription} from "rxjs";
import {Bill} from "../shared/models/bill.model";


@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit,OnDestroy {
    subscription: Subscription;
    subscription1: Subscription;
    bill;
    currency;
    isLoaded = false;

    constructor(
        private courseService: CourseService
    ) {
    }

    onRefresh() {
        this.isLoaded = false;
        this.subscription1 =  this.courseService.getCurrency("EUR")
            .subscribe((currency:any)=>{
                this.currency = currency;
                this.isLoaded = true;
            })
    }

    ngOnInit() {
        this.subscription = combineLatest(this.courseService.getBill(), this.courseService.getCurrency("EUR"))
            .subscribe((data:[Bill,any]) => {
            this.bill = data[0];
            this.currency = data[1];
            this.isLoaded = true;
        })
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
        if(this.subscription1){
            this.subscription1.unsubscribe();
        }
    }
}
