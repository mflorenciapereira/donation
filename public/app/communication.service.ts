import { Injectable } from '@angular/core';

import Map from 'esri/Map';
import GraphicsLayer from 'esri/layers/GraphicsLayer';

import { PointModel } from './point.model';
import Graphic from 'esri/Graphic';
import Point from 'esri/geometry/Point';
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Field from 'esri/layers/support/Field';
import Color from 'esri/Color';
import SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as io from "socket.io-client";




@Injectable()
export class CommunicationService {

    
  socket = null;
  userId: string;
  sub: any;

  connect(){
    if(this.socket)
      return this.socket;
      
    this.socket = io.connect('http://localhost:8000');
    return this.socket;

  }


}



