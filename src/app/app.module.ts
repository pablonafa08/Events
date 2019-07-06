import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';
import { AuthGuard } from './guards/auth.guard';
import { NoauthGuard } from './guards/noauth.guard';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DatePipe } from '@angular/common';

import { UserService } from './services/user.service';
import { EventService } from './services/event.service';

import { AppComponent } from './app.component';
import { ListComponent } from './components/events/list/list.component';
import { AddeventComponent } from './components/events/addevent/addevent.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { LoginComponent } from './components/users/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltereventPipe } from './pipes/filterevent.pipe';

const routes : Routes = [
  {path: '',component: ListComponent, canActivate: [AuthGuard]},
  {path: 'user/add',component: AdduserComponent, canActivate: [NoauthGuard]},
  {path: 'login',component: LoginComponent, canActivate: [NoauthGuard]},
  {path: 'event/add',component: AddeventComponent, canActivate: [AuthGuard]},
  {path: 'event/all',component: ListComponent, canActivate: [AuthGuard]},
  {path: '**', component: ListComponent, canActivate: [AuthGuard]}
]

const config: SocketIoConfig = { url: 'http://api.events.indqtech.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddeventComponent,
    AdduserComponent,
    LoginComponent,
    HeaderComponent,
    FiltereventPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNo4HVxVlLxv6yMrkKeZPptH9zmhKkVBE'
    }),
    SocketIoModule.forRoot(config),
    GooglePlaceModule
  ],
  providers: [
    UserService,
    EventService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
