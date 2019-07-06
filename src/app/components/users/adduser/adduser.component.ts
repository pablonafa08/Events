import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  public user: User;
  public pass2: string;
  public regExp = new RegExp("[A-Z|a-z|.|_|-|0-9]+[@][a-z]+[.][a-z]+");//[a-z]+\.[a-z]+
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    this.user = new User('','','','','');
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.user.password.length < 8){
      this.toastr.error('La contraseña debe tener un mínimo de 8 caracteres')
    }else if(this.user.password != this.pass2){
      this.toastr.error('La contraseña no coincide');
    }else if(!this.regExp.test(this.user.email)){
      this.toastr.error('El correo electrónico ingresado es incorrecto');
    }else{
      this.userService.register(this.user).subscribe(
        res=>{
          if(res){
            this.toastr.success('Usuario registrado correctamente. Proceda al inicio de sesión');
            this.user = new User('','','','','');
          }
        },
        err=>{
          this.toastr.error(err._body);
          console.log(<any>err);
        }
      );
    }

  }

  onlyText(e){
    let key = e.keyCode;
    if( (key>=97 && key <= 122) || (key==32) || (key==225) || (key==233) || (key==237) || (key==243) || (key==250)){
      return key;
    }else{
      return false;
    }
  }

}
