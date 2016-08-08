import { Component, OnInit } from '@angular/core';
import { VoluntaryMapComponent } from './voluntary-map.component';

import { Router, ActivatedRoute }       from '@angular/router';

@Component({
  selector: 'voluntary',
  template: '<h1 class="text-center">Voluntary</h1><br><voluntary-map #mapView [userId]="userId"></voluntary-map>', 
  directives: [VoluntaryMapComponent]  
  
})
export class VoluntaryComponent {  
  userId: string;
  sub: any;

	constructor(private route: ActivatedRoute,
    private router: Router) {    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.userId = params['userId'];        
     });
  }

}
