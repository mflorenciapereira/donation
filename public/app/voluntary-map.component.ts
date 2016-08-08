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

@Component({
  selector: 'voluntary-map',
  templateUrl: './app/voluntary-map.component.html',
  directives: [Modal]
    
})
export class VoluntaryMapComponent {

  @Input() userId: string;  
  
  socket = null;
 
  point: PointModel = new PointModel();
  view: MapView;

  _modal = null;
  error = '';
  ok = '';
  submitted = false;
  active = true;  
    
  constructor(private mapService: MapService, 
    private elementRef: ElementRef, 
    private communicationService: CommunicationService) {

  }

  ngOnInit() {

    var me = this;

    this.socket = this.communicationService.connect();

    this.socket.on('pointAddedResult', function(result){    
      if(result.error){
        this.error = result.error;
        this.active = true;        
      }else{        
        this.ok = "Voluntary added successfully. Thank you!"        
      }    
    }.bind(this));

    this.socket.on('userPointsLoaded', function(user){      
      if(user == null)
        return;
      var points = [] ;      
      points = me.convertPoints(user.points);      
      for(var point of points){
        this.mapService.addPoint(point, true);
      }      
    }.bind(this));  

    this.socket.on('pointAdded', function(point){
      var pointModel = new PointModel;
      pointModel.fromPoint(point);      
      this.mapService.addPoint(pointModel, true);            
    }.bind(this));   

    this.socket.on('pointDeleted', function(result){     
      if(!result.error){
        this.mapService.removePoint(result.id);
      }            
    }.bind(this));

    
    navigator.geolocation.getCurrentPosition(function(position) {      
      me.renderView(position);          
    });

  }

  editPoint(feature){
    this.point = this.mapService.fromFeatures(feature.attributes);
    this.open(this.point.latitude, this.point.longitude);
  }

  deletePoint(feature){  
    var point = this.mapService.fromFeatures(feature.attributes);  
    this.socket.emit("deletePoint", point._id);
  }

  renderView(position){
    
    this.view = this.mapService.createView(this.elementRef,position);
    
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

    //Actions
    this.view.on("click", function(evt) {
      this.point = new PointModel;        
        var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
        if(!me.view.popup.visible){
            me.open(evt.mapPoint.latitude, evt.mapPoint.longitude);
        }          
          
        me.view.popup.on("trigger-action", function(evt2) {
          if (evt2.action.id === "edit") {           
                me.view.popup.close();     
                me.editPoint(me.view.popup.selectedFeature);                                
            }

            if (evt2.action.id === "delete") {                      
                  me.view.popup.close();     
                  me.deletePoint(me.view.popup.selectedFeature);                                
            }
        });
        
      });

      this.socket.emit('loadPointsByUser', this.userId); 
  }


  onSubmit() {  
      this.submitted = true;
      this.socket.emit('addPoint', this.point, this.userId);
  }

  bindModal(modal) {
      this._modal=modal;
  }

  open(lat, lon) {
      this.ok = '';
      this.error = '';
      this.submitted = false;
      this.active = true;
      this.point.latitude = lat;
      this.point.longitude = lon;
      this._modal.open();         
  }

  close() {
    this._modal.close();
    this.submitted = false;
    this.active = false;           
  }

  convertPoints(points){    
      var pointsConverted = [];
      
      for(var point of points){
        var pointModel = new PointModel();
        pointModel.fromPoint(point);
        pointsConverted.push(pointModel);
      }

      return pointsConverted;  
  }


}
