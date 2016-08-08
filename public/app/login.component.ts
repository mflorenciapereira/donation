import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';



@Component({
  selector: 'login',
  templateUrl: './app/login.component.html',   
  directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {

  userId: string;

  constructor(private router: Router){
  
  }

  voluntary(){  
    this.router.navigate(['/voluntary', this.userId]);  
  }

  patient(){  
    this.router.navigate(['/patient']);  
  }


}
