import { Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
// import { Socket } from 'ng6-socket-io';

@Injectable()
export class EventService{
    public url: string;

    constructor(
        private http:Http
        ){
        this.url = GLOBAL.url +'events';
    }

    public register(event_to_register,token){
        let params = JSON.stringify(event_to_register);
        let headers = new Headers({'Content-Type':'application/json','Authorization':token});

        return this.http.post(this.url,params,{headers:headers}).map(res=>res.json());
    }

    public getEvents(token){
        let headers = new Headers({'Authorization':token});

        return this.http.get(this.url,{headers: headers}).map(res=>res.json());
    }

    public getEventsByTitle(token,title,page){
        let headers = new Headers({'Authorization':token});

        return this.http.get(this.url+'?page='+page+'&title='+title,{headers: headers}).map(res=>res.json());
    }

    public getEventsByAdress(token,lat,lng,page){
        let headers = new Headers({'Authorization':token});

        return this.http.get(this.url+'?page='+page+'&lat='+lat+'&lng='+lng,{headers: headers}).map(res=>res.json());
    }

    public attend(token, id){
        let params = JSON.stringify({eventId:id});
        let headers = new Headers({'Content-Type':'application/json','Authorization':token});

        return this.http.post(this.url+'/attendance/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public noAttend(token, id){
        let headers = new Headers({'Authorization':token});

        return this.http.delete(this.url+'/attendance/'+id,{headers: headers}).map(res=>res.json());
    }

    public uploadImage(image:File, token){

        return new Promise((resolve, reject) =>{
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
    
            formData.append('file', image, image.name);
    
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        console.log('imagen subida');
                        resolve(xhr.response);
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            let urlS = GLOBAL.url +'images';
            
            xhr.open('POST',urlS, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
       
    }

    // public prueba(){
    //     this.socket.on('events',(msg)=>{
    //         // console.log(msg);
    //         return msg;
    //     });
        
    // }
    
}