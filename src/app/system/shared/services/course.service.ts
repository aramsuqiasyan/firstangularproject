import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../models/bill.model";
import {map} from "rxjs/operators";

@Injectable()

export class CourseService {

    constructor(
        private http: HttpClient
    ) {
    }

    getBill(){
        return this.http.get(`http://localhost:3000/bill`)
    }

    updateBill(bill:Bill){
        return this.http.put(`http://localhost:3000/bill/`,bill);
    }

    getCurrency(base) : Observable<any>{
        return this.http.get(`http://data.fixer.io/api/latest?access_key=a148e57d38db1fa010336901787daed0&base=${base}`)
    }
}
