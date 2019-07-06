import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.user = new User('','','','','')
  }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.login(this.user).subscribe(
      res=>{
        if(res){
          localStorage.setItem('identity',JSON.stringify(res));
          this.router.navigate(['/event/all'])
        }
      },
      err=>{
        console.log(err._body);
        this.toastr.error(err._body);
        console.log(<any>err);
      }
    );
  }

}
