import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BillComponent} from "./bill/bill.component";
import {SystemComponent} from "./system.component";
import {PlaningComponent} from "./planing/planing.component";
import {RecordsComponent} from "./records/records.component";
import {HistoryComponent} from "./history/history.component";
import {HistoryDetailComponent} from "./history/history-detail/history-detail.component";
import {AuthGuard} from "../shared/services/auth.guard";

const routes: Routes = [
    {
        path: "", component: SystemComponent,canActivate:[AuthGuard], children: [
            {path: "bill", component: BillComponent},
            {path: "planing", component: PlaningComponent},
            {path: "records", component: RecordsComponent},
            {path: "history", component: HistoryComponent},
            {path: "history/:id", component: HistoryDetailComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class SystemRoutingModule {
}
