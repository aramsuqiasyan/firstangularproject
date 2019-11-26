import {Pipe, PipeTransform} from "@angular/core";
import {APPEvent} from "../models/app-event.model";



@Pipe({
    name:'searchPipe'
})
export class SearchPipe implements  PipeTransform{

    transform(value:APPEvent[], searchString:string,critery:string): any {
        searchString = searchString.toLowerCase();
        return value.filter((evt)=>{
            if(searchString == ""){
                return value;
            }else{
                if(String(evt[critery]).toLowerCase().indexOf(searchString) > -1){
                    return evt;
                }
            }

        });
    }

}
