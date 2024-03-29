import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment, environment_example } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    // constructor(
    //     private router: Router,
    //     private authenticationService: AuthenticationService,
    //     private authFackservice: AuthfakeauthenticationService
    // ) { }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     if (environment_example.defaultauth === 'firebase') {
    //         const currentUser = this.authenticationService.currentUser();
    //         if (currentUser) {
    //             // logged in so return true
    //             return true;
    //         }
    //     } else {
    //         const currentUser = this.authFackservice.currentUserValue;
    //         if (currentUser) {
    //             // logged in so return true
    //             return true;
    //         }
    //         // check if user data is in storage is logged in via API.
    //         if(localStorage.getItem('currentUser')) {
    //             return true;
    //         }
    //     }
    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

    constructor(private AuthenticationService: AuthenticationService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {
        if (this.AuthenticationService.isAuthenticated()) {
          return true;
        } else {
          // Jika pengguna belum login, arahkan mereka ke halaman login
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false
        }
      }
}
