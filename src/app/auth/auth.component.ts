import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../shared/services/users.service';

@Component({
    selector:"app-auth",
    templateUrl:"./auth.component.html"
})
export class AuthComponent implements OnInit{

    constructor(private router:Router){}

    ngOnInit(): void {
      this.router.navigate(['/login'])
    }
}
