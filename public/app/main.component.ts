import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';
import {ROUTER_DIRECTIVES} from '@angular/router';



@Component({
  selector: 'main',
  templateUrl: './app/main.component.html',   
  directives: [ROUTER_DIRECTIVES]
})

export class MainComponent {    
}
