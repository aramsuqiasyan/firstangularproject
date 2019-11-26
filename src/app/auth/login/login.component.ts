import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";

import {UsersService} from "../../shared/services/users.service";
import {formatDate} from "@angular/common";
import {Message} from "../../shared/models/message.model";
import {AuthService} from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    message: Message;

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private  route:ActivatedRoute
    ) {
    }

    private showMessage(text: string, type: string = "danger") {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = "";
        }, 5000);
    }

    onSubmit() {
        const formData = this.form.value;
        this.usersService.getUserByEmail(formData.email).subscribe(user => {
            if (user) {
                if (user.password == formData.password) {
                    this.message.text = "";
                    window.localStorage.setItem('user', JSON.stringify(user))
                    this.authService.login();
                    this.router.navigate(['/system','bill']);
                } else {
                    this.showMessage("Пароль не верный!!")
                }
            } else {
                this.showMessage("Такого пользвателя не сушествует!!")
            }
        })
    }

    ngOnInit() {
        this.message = new Message("danger", "");

        this.route.queryParams
            .subscribe(params=>{
                if(params['accessDenied']){
                    this.showMessage('STOP','warning')
                }
            })

        this.form = new FormGroup({
            "email": new FormControl(null, [Validators.required, Validators.email]),
            "password": new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }
}
