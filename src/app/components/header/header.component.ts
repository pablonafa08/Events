import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  public identity;
  constructor(
    private userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this.userService.getIdentity();
  }

  logOut(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

}
