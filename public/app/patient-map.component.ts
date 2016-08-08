import { Component, ElementRef, Output, Input, EventEmitter,ViewChild } from '@angular/core';
import { MapService } from './map.service';
import { PointModel }    from './point.model';

import MapView from 'esri/views/MapView';
import Locate from 'esri/widgets/Locate';
import Locator from 'esri/tasks/Locator';
import Search from 'esri/widgets/Search';
import Point from 'esri/geometry/Point';
import Graphic from 'esri/Graphic';
import SpatialReference from 'esri/geometry/SpatialReference';

import Color from 'esri/Color';
import FeatureLayer from 'esri/layers/FeatureLayer'
import SimpleRenderer from 'esri/renderers/SimpleRenderer'
import TextSymbol from 'esri/symbols/TextSymbol';
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import {Modal} from './modal.component';
import { NgForm }    from '@angular/forms';
import { CommunicationService } from './communication.service';
import webMercatorUtils from 'esri/geometry/support/webMercatorUtils'

@Component({
  selector: 'patient-map',
  templateUrl: './app/patient-map.component.html'

})

export class PatientMapComponent {
  
  socket = null;

  view: MapView;  

  constructor(private mapService: MapService, 
    private elementRef: ElementRef, 
    private communicationService: CommunicationService) {

  }

  ngOnInit() {
    this.socket = this.communicationService.connect();    

    this.socket.on('pointsLoaded', function(points){     
      
      if(points == null || points.length == 0)
        return;

      var renderedPoints = this.mapService.convertPoints(points); 
            
      for(var point of renderedPoints){
        this.mapService.addPoint(point, false);
      }      

    }.bind(this));


    this.socket.on('pointAdded', function(point){
        this.addIfBetween(point);
    }.bind(this)); 

    this.socket.on('pointRemoved', function(id){         
        this.mapService.removePoint(id);             
    }.bind(this));

    this.socket.on('pointUpdated', function(point){         
        this.mapService.removePoint(point._id); 
        this.addIfBetween(point);            
    }.bind(this));

    this.socket.emit('registerPatient');

    var me = this;

    navigator.geolocation.getCurrentPosition(function(position) {      
      me.renderView(position);          
    });
    
  }


  renderView(position){
      
    this.view = this.mapService.createView(this.elementRef, position);
    //Location
    this.view.ui.add(this.mapService.createLocation(this.view), {
          position: "top-left",
          index: 0
    });

    //Search    
    this.view.ui.add(this.mapService.createSearchWidget(this.view), {
          position: "top-left",
          index: 0
    });      

    var me = this;      
        
    this.view.watch("stationary", function(newValue, oldValue) {
      if(newValue==true){
        me.reloadPoints();
      }   
    });

    this.view.watch("extent", function(newValue, oldValue) {
      if(oldValue==null && newValue!=null){
        me.reloadPoints();        
      }      
    });

   }

  reloadPoints(){

    if(!this.view.extent)     
        return ;
     
     var extent = this.view.extent;          
     var min = webMercatorUtils.xyToLngLat(extent.xmin, extent.ymin);
     var max = webMercatorUtils.xyToLngLat(extent.xmax, extent.ymax);            
     this.socket.emit("loadPointsByCoords", min[0], max[0], min[1], max[1] );
     
   }

   addIfBetween(point){

     if(!this.view.extent)     
        return ;
                        
     var extent = this.view.extent;          
     var min = webMercatorUtils.xyToLngLat(extent.xmin, extent.ymin);
     var max = webMercatorUtils.xyToLngLat(extent.xmax, extent.ymax);    

     var pointModel = new PointModel;
     pointModel.fromPoint(point);
     if(point.between(min, max))      
        this.mapService.addPoint(pointModel, false);
    }

}
