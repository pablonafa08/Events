import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public identity;
  constructor(
    private userService: UserService,
    private router: Router){
      
    }
  canActivate(){
    this.identity = this.userService.getIdentity();
    if(this.identity!=null){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
