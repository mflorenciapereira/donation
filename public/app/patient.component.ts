import { Component, OnInit } from '@angular/core';
import { PatientMapComponent } from './patient-map.component';


@Component({
  selector: 'patient',
  template: '<h1 class="text-center">Patient</h1><br><patient-map #mapView ></patient-map>', 
  directives: [PatientMapComponent]  
  
})
export class PatientComponent {  
  

}
