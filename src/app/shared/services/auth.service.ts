import {Injectable} from "@angular/core";


@Injectable()
export class AuthService {
    private isAuthenticated = false;

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean {
        if(window.localStorage.getItem('user')){
            return this.isAuthenticated = true;
        }
        return this.isAuthenticated;
    }
}
