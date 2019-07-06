import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public identity;
  public events: Event[];
  public url;
  private socket;
  public search ="";
  public page = 1;
  public lat:number;
  public lng:number;
  public pages = [];
  public typeSearch;
  options:{
    componentRestrictions :{
      country:["MX"]
    }
  }
  constructor(
    private eventService: EventService,
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    this.url = GLOBAL.url;
    this.socket = io('http://api.events.indqtech.com');
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.eventService.getEvents(this.identity.token).subscribe(
      res=>{
        this.events = res.items;
        console.log(this.events);
        this.createPagination(res);
        this.typeSearch = "title";
      },
      err=>{
        console.log(<any>err);
        this.toastr.error(err._body);
      }
    );

    this.socket.on('events',(msg)=>{
      this.events[this.events.findIndex(e=>e.id==msg.id)].attendances = msg.attendances;
      this.events[this.events.findIndex(e=>e.id==msg.id)].willYouAttend = !this.events[this.events.findIndex(e=>e.id==msg.id)].willYouAttend;
    });
  }

  attend(id){
    this.eventService.attend(this.identity.token,id).subscribe(
      res=>{
        if(res){
          this.toastr.success('Asistencia registrada correctamente');
        }
        
      },
      err=>{
        this.toastr.error(err._body);
        console.log(<any>err);
      }
    );
  }

  noAttend(id){
    this.eventService.noAttend(this.identity.token,id).subscribe(
      res=>{
        if(res){
          this.toastr.success('Asistencia eliminada correctamente');
        }
      },
      err=>{
        this.toastr.error(err._body);
        console.log(<any>err);
      }
    );
  }

  getEventsByTitle(){
    console.log(this.search);
    this.page = 1;
    this.eventService.getEventsByTitle(this.identity.token,this.search,this.page).subscribe(
      res=>{
        if(res){
          console.log(res);
          this.events = res.items;
          this.createPagination(res);
          this.typeSearch = "title";
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

  getEventsByAddress(address: any){
    let latlong;
    latlong=address.geometry.location.toString();
    // console.log(latlong);
    let coordenadas = latlong.split(",");
    this.lat=parseFloat(coordenadas[0].substring(1,coordenadas[1].length));
    this.lng=parseFloat(coordenadas[1].substring(1,coordenadas[1].length-1));

    this.eventService.getEventsByAdress(this.identity.token,this.lat,this.lng,this.page).subscribe(
      res=>{
        if(res){
          console.log(res);
          this.events = res.items;
          this.createPagination(res);
          this.typeSearch = "address";
        }
      },
      err=>{
        console.log(<any>err);
      }
    );

  }

  createPagination(obj){
    this.pages = [];
    for (let i = 1; i <= obj.pages; i++) {
      this.pages.push(i);
      
    }
  }

  changePage(pag){
    this.page = pag;
    if(this.typeSearch == "title"){
      this.eventService.getEventsByTitle(this.identity.token,this.search,this.page).subscribe(
        res=>{
          if(res){
            console.log(res);
            this.events = res.items;
            this.createPagination(res);
            this.typeSearch = "title";
          }
        },
        err=>{
          console.log(<any>err);
        }
      );
    }else{
      this.eventService.getEventsByAdress(this.identity.token,this.lat,this.lng,this.page).subscribe(
        res=>{
          if(res){
            console.log(res);
            this.events = res.items;
            this.createPagination(res);
            this.typeSearch = "address";
          }
        },
        err=>{
          console.log(<any>err);
        }
      );
    }
  }

}
