import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
 canDeactivate: (component: CanComponentDeactivate,
                 currentRoute: ActivatedRouteSnapshot,
                 currentState: RouterStateSnapshot,
                 nextState: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot) {
    return component.canDeactivate && nextState.url !== '/adjointe' && nextState.url !== '/juge' ?
      component.canDeactivate(component, currentRoute, currentState, nextState) :
      true;
  }
}