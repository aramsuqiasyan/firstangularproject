import {Component, OnInit} from "@angular/core";
import {UsersService} from "../shared/services/users.service";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html'
})


export class SystemComponent implements OnInit {
    date: Date = new Date();
    userName: string = "";

    constructor(
        private authService: AuthService,
        private router:Router
        ) {
    }

    ngOnInit(): void {
        this.userName = JSON.parse(window.localStorage.getItem('user')).name;
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login'])
    }

}

