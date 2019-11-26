import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SystemComponent} from "./system.component";
import {BillComponent} from './bill/bill.component';
import {SystemRoutingModule} from "./system-routing.module";
import { RecordsComponent } from './records/records.component';
import { HistoryComponent } from './history/history.component';
import { PlaningComponent } from './planing/planing.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { ScoreComponent } from './bill/score/score.component';
import { CourseComponent } from './bill/course/course.component';
import {CourseService} from "./shared/services/course.service";
import { AddCategoryComponent } from './records/add-category/add-category.component';
import { AddEventComponent } from './records/add-event/add-event.component';
import { EditCategoryComponent } from './records/edit-category/edit-category.component';
import {SharedModule} from "../shared/shared.module";
import {CategoriesService} from "./shared/services/categories.service";
import {EventsService} from "./shared/services/events.service";
import { HistoryChartComponent } from './history/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history/history-events/history-events.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';
import {PieChartModule} from "@swimlane/ngx-charts";
import {SearchPipe} from "./shared/pipes/search.pipe";

@NgModule({
    declarations: [
        BillComponent,
        SystemComponent,
        RecordsComponent,
        HistoryComponent,
        PlaningComponent,
        DropdownDirective,
        ScoreComponent,
        CourseComponent,
        AddCategoryComponent,
        AddEventComponent,
        EditCategoryComponent,
        HistoryChartComponent,
        HistoryEventsComponent,
        HistoryDetailComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        SystemRoutingModule,
        SharedModule,
        PieChartModule
    ],
    providers:[
        CourseService,
        CategoriesService,
        EventsService
    ]
})
export class SystemModule {
}
