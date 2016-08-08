import { Injectable } from '@angular/core';

import Map from 'esri/Map';
import GraphicsLayer from 'esri/layers/GraphicsLayer';

import { PointModel } from './point.model';
import Graphic from 'esri/Graphic';
import Point from 'esri/geometry/Point';
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Field from 'esri/layers/support/Field';
import Color from 'esri/Color';
import SimpleRenderer from 'esri/renderers/SimpleRenderer';
import SpatialReference from 'esri/geometry/SpatialReference';
import MapView from 'esri/views/MapView';
import Locate from 'esri/widgets/Locate';
import Search from 'esri/widgets/Search';





@Injectable()
export class MapService {

  map: Map;
  pointGraphicsLayer: GraphicsLayer;
  private defaultSymbol: PictureMarkerSymbol = new PictureMarkerSymbol({
    "url":"./app/img/pin.png",
    "height":20,
    "width":12       
  })

editAction = {
  // This text is displayed as a tooltip
  title: "Edit",
  // The ID by which to reference the action in the event handler
  id: "edit",
  // Sets the icon font used to style the action button
  className: "esri-icon-edit",
};

deleteAction = {
  // This text is displayed as a tooltip
  title: "Delete",
  // The ID by which to reference the action in the event handler
  id: "delete",
  // Sets the icon font used to style the action button
  className: "esri-icon-trash",
};


   pTemplate = {
        title: "Voluntary data",
        content: "First name: {firstName}<br>Last name: {lastName}<br>Address: {address}<br>Phone: <span name=\"{phone}\" id=\"phonePopup\"><a onClick=\"document.getElementById('phonePopup').innerHTML = document.getElementById('phonePopup').attributes.name.value\">Show phone</a></span><br>Email:  <span name=\"{email}\" id=\"emailPopup\"><a onClick=\"document.getElementById('emailPopup').innerHTML = document.getElementById('emailPopup').attributes.name.value\">Show email</a></span><br>Blood group: {bloodGroup}<br>"        
       
   }

      
  constructor() {
    this.map = new Map({
      basemap: 'topo'
    });
    this.pointGraphicsLayer = new GraphicsLayer();
    this.map.add(this.pointGraphicsLayer);    

  }

  addPoint(point: PointModel, addActions: boolean) {
      
    let graphic = new Graphic({
      geometry: new Point({
        x: point.longitude,
        y: point.latitude,
        spatialReference: 4326
      }),
      attributes: {  
          
        firstName: point.firstName,
        lastName: point.lastName,
        address: point.address,
        phone: point.phone,
        email: point.email,
        bloodGroup: point.bloodGroup,
        longitude: point.longitude,
        latitude: point.latitude,
        ip: point.ip,
        _id: point._id

      },
      popupTemplate: this.pTemplate,
      symbol: this.defaultSymbol
    });    

    if(addActions){
      graphic.popupTemplate.actions.push(this.editAction);
      graphic.popupTemplate.actions.push(this.deleteAction);
    }
     
    this.pointGraphicsLayer.graphics.add(graphic);  
    
  }


   removePoint(id) {
      
   for(var graphic of this.pointGraphicsLayer.graphics.toArray()){

     if(graphic.attributes._id == id){
       this.pointGraphicsLayer.graphics.remove(graphic);
       break;
    }
   }
    
    
  }

 
  
  

  fromFeatures(attributes){
    var point = new PointModel;
    point.fromFeatures(attributes);
    return point;
   
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

   createView(elementRef, position){
    return new MapView({
        container: elementRef.nativeElement.firstChild,
        map: this.map,
        center: new Point({
          x: position.coords.longitude,
          y: position.coords.latitude,
          spatialReference: new SpatialReference({ wkid: 4326 })
        }),
        zoom: 14
      });
  }

  createLocation(view){
      var locateBtn = new Locate({
        view: view
      });
      locateBtn.startup();
      return locateBtn;
  }

  createSearchWidget(view){
    var searchWidget = new Search({
        view: view
      });
      searchWidget.startup();
      return searchWidget;
  }
}




