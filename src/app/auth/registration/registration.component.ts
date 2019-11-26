import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {log} from "util";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;


    constructor(
        private router: Router,
        private userService: UsersService
    ) {
    }

    onSubmit() {
        const {email, name, password} = this.form.value;
        const user = new User(email, password, name);
        this.userService.createNewUser(user)
            .subscribe(user => {
                console.log(user)
            });
    }

    ngOnInit() {
        this.form = new FormGroup({
            "email": new FormControl(null, [Validators.required, Validators.email], this.userCheck.bind(this)),
            "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
            "name": new FormControl(null, [Validators.required]),
            "agree": new FormControl(false, [Validators.requiredTrue])
        })
    }


    userCheck(email:FormControl) {
        console.log(email.value);
        return this.userService.checkUserByEmail(email.value)
    }
}
