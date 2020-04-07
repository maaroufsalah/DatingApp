import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(
        private userSevices: UserService,
        private router: Router,
        private alertify: AlertifyService
        ){}

        resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
            return this.userSevices.getUsers().pipe(
                catchError(error => {
                  this.alertify.error('Problem retrieving data');
                  this.router.navigate(['/home']);
                  return of(null);
                })
            );
        }
}