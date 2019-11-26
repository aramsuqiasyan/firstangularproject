import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    @Input() bill:Bill;
    @Input() currency;

    dollar;
    rub;

    constructor() {
    }

    ngOnInit() {
        const {rates} = this.currency;
        this.dollar = rates['USD'] *  this.bill.value;
        this.rub = rates['RUB'] * this.bill.value;

    }

}
