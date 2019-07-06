import { Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(private http:Http){
        this.url = GLOBAL.url +'users';
    }

    public register(user_to_register){
        let params = JSON.stringify(user_to_register);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url,params,{headers:headers}).map(res=>res.json());
    }

    public login(user){
        let params = JSON.stringify(user);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url+'/login',params,{headers:headers}).map(res=>res.json());
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity!="undefined"){
            this.identity = identity;
        }else{
            this.identity =null;
        }
        return this.identity;
    }
    getToken(){
        let token = localStorage.getItem('token');
        if(token!="undefined"){
            this.token = token;
        }else{
            this.token =null;
        }
        return this.token;
    }
}