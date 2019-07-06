import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../models/event';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../../services/user.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  public event: Event;
  public imageUpload: File;
  public url;
  public identity;
  public dateMin;
  public lat:number;
  public lng:number;
  options:{
    componentRestrictions :{
      country:["MX"]
    }
  }
  constructor(
    private eventService: EventService,
    private userService: UserService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { 
    this.event = new Event(null,'','','','',0,false,[0,0]);
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();

    this.dateMin = new Date();
    this.dateMin.setDate(this.dateMin.getDate() + 1);
    this.dateMin = this.datePipe.transform(this.dateMin,"yyyy-MM-dd");
    this.dateMin += "T00:00";
    // console.log(this.dateMin);
  }


onSubmit(){
  this.eventService.uploadImage(this.imageUpload,this.identity.token)
  .then((result: any)=>{
    let res = JSON.parse(result);
    this.event.image = res.fileName;
    let event = {title: this.event.title, description: this.event.description, date: this.event.date, image: this.event.image, location: this.event.location}
    this.eventService.register(event,this.identity.token).subscribe(
      res=>{
        if(res){
          this.toastr.success('Evento registrado correctamente');
          this.event = new Event(null,'','','','',0,false,[0,0]);
          this.lat = 0;
          this.lng = 0;
          $("#address").val('');
          this.removeImage();
          console.log(res);
        }
      },
      err=>{
        this.toastr.error(err._body);
        console.log(<any>err);
      }
    );
    console.log(this.event);
  });

}
  

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageUpload = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        this.url = reader.result;

      }
    }
  }

  removeImage(){
    this.imageUpload = null;
    this.url = null;
  }

  public handleAddressChange(address: any){
    let latlong;
    latlong=address.geometry.location.toString();
    // console.log(latlong);
    let coordenadas = latlong.split(",");
    this.lat=parseFloat(coordenadas[0].substring(1,coordenadas[1].length));
    this.lng=parseFloat(coordenadas[1].substring(1,coordenadas[1].length-1));
    
    this.event.location[0] = this.lng;
    this.event.location[1] = this.lat;
  }

}
