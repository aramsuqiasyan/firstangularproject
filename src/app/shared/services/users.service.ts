import {Injectable} from "@angular/core";
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable, pipe,} from "rxjs";

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getUserByEmail(email): Observable<User> {
        return this.http.get(`http://localhost:3000/users/?email=${email}`)
            .pipe(
                map((user) => user[0] ? user[0] : null)
            )
    }

    createNewUser(user: User){
       return this.http.post("http://localhost:3000/users", user)
    }

    checkUserByEmail(email:string){
        return this.http.get(`http://localhost:3000/users/?email=${email}`)
            .pipe(
                map((user:Array<User>)=>{
                    if(user.length){
                        return {
                            emailAlreadyExists:true
                        }
                    }else{
                        return  null
                    }
                })
            )

    }
}
