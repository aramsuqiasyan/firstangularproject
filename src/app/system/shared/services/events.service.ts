import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APPEvent} from "../models/app-event.model";

@Injectable()
export class EventsService {
    constructor(
        public http: HttpClient
    ) {}

    addEvent(event:APPEvent){
        return this.http.post('http://localhost:3000/events',event)
    }


    getEvents(){
        return this.http.get('http://localhost:3000/events');
    }


    getEventById(id:string){
        return this.http.get(`http://localhost:3000/events/${id}`);
    }
}
