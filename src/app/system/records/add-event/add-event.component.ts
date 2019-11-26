import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Category} from "../../shared/models/category.model";
import {APPEvent} from "../../shared/models/app-event.model";
import {EventsService} from "../../shared/services/events.service";
import {CourseService} from "../../shared/services/course.service";
import {Bill} from "../../shared/models/bill.model";
import {mergeMap} from "rxjs/operators";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit,OnDestroy {

    @Input() categories: Category[] = [];
    message: Message;

    subscription1:Subscription;
    subscription2:Subscription;

    types = [
        {
            type: 'income',
            label: 'Income'
        },
        {
            type: 'outcome',
            label: 'Outcome'
        },
    ];


    constructor(
        private eventsService: EventsService,
        private courseService: CourseService
    ) {
    }

    ngOnInit() {
        this.message = new Message('success', '')
    }

    onSubmit(form: NgForm) {
        let {amount, description, category, type} = form.value;
        if (amount < 0) {
            amount *= -1
        }
        let date = new Date();

        const appEvent = new APPEvent(
            type, amount, +category, date.toDateString(), description
        );

        this.subscription1 = this.courseService.getBill()
            .subscribe((bill: Bill) => {
                let value = bill.value;
                if (type === 'outcome') {
                    if (amount > bill.value) {
                        // error message
                        this.message.type = 'danger';
                        this.message.text = `Недостаточно средств! Вам нехвотает ${bill.value - amount + " " + bill.currency} `;
                        setTimeout(() => {
                            this.message.text = ''
                        }, 5000);
                        // error message
                        return;
                    } else {
                        value = bill.value - amount
                    }
                } else {
                    value = bill.value + amount
                }

                this.subscription2 = this.courseService.updateBill({value, currency: bill.currency})
                    .pipe(
                        mergeMap(x => {
                            return this.eventsService.addEvent(appEvent);
                        })
                    )
                    .subscribe((data) => {
                        // success message
                        this.message.type = 'success';
                        this.message.text = "Событиие добавлено!";
                        setTimeout(() => {
                            this.message.text = ''
                        }, 5000);
                        // success message
                        form.setValue({
                            amount: 0,
                            description: ' ',
                            category: 1,
                            type: 'outcome'
                        })
                    })
            })

    }

    ngOnDestroy(): void {
        if(this.subscription1){
            this.subscription1.unsubscribe()
        }

        if(this.subscription2){
            this.subscription2.unsubscribe()
        }
    }
}
