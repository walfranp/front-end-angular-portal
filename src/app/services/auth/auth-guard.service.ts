import { Observable } from 'rxjs-compat/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (sessionStorage['tkn_associado'] != null) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
