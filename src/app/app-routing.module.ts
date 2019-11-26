import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router"
import {NotfoundComponent} from "./notfound/notfound.component";

const routes: Routes = [
    {path: '', redirectTo:'login',pathMatch:'full'},
    {path:'system',loadChildren:'./system/system.module#SystemModule'},
    {path:"**",component:NotfoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{
            preloadingStrategy:PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ]
})


export class AppRoutingModule {
}
