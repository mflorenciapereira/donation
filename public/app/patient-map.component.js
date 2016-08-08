System.register(['@angular/core', './map.service', './point.model', './communication.service', 'esri/geometry/support/webMercatorUtils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, map_service_1, point_model_1, communication_service_1, webMercatorUtils_1;
    var PatientMapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (point_model_1_1) {
                point_model_1 = point_model_1_1;
            },
            function (communication_service_1_1) {
                communication_service_1 = communication_service_1_1;
            },
            function (webMercatorUtils_1_1) {
                webMercatorUtils_1 = webMercatorUtils_1_1;
            }],
        execute: function() {
            PatientMapComponent = (function () {
                function PatientMapComponent(mapService, elementRef, communicationService) {
                    this.mapService = mapService;
                    this.elementRef = elementRef;
                    this.communicationService = communicationService;
                    this.socket = null;
                }
                PatientMapComponent.prototype.ngOnInit = function () {
                    this.socket = this.communicationService.connect();
                    this.socket.on('pointsLoaded', function (points) {
                        if (points == null || points.length == 0)
                            return;
                        var renderedPoints = this.mapService.convertPoints(points);
                        for (var _i = 0, renderedPoints_1 = renderedPoints; _i < renderedPoints_1.length; _i++) {
                            var point = renderedPoints_1[_i];
                            this.mapService.addPoint(point, false);
                        }
                    }.bind(this));
                    this.socket.on('pointAdded', function (point) {
                        this.addIfBetween(point);
                    }.bind(this));
                    this.socket.on('pointRemoved', function (id) {
                        this.mapService.removePoint(id);
                    }.bind(this));
                    this.socket.on('pointUpdated', function (point) {
                        this.mapService.removePoint(point._id);
                        this.addIfBetween(point);
                    }.bind(this));
                    this.socket.emit('registerPatient');
                    var me = this;
                    navigator.geolocation.getCurrentPosition(function (position) {
                        me.renderView(position);
                    });
                };
                PatientMapComponent.prototype.renderView = function (position) {
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
                    this.view.watch("stationary", function (newValue, oldValue) {
                        if (newValue == true) {
                            me.reloadPoints();
                        }
                    });
                    this.view.watch("extent", function (newValue, oldValue) {
                        if (oldValue == null && newValue != null) {
                            me.reloadPoints();
                        }
                    });
                };
                PatientMapComponent.prototype.reloadPoints = function () {
                    if (!this.view.extent)
                        return;
                    var extent = this.view.extent;
                    var min = webMercatorUtils_1.default.xyToLngLat(extent.xmin, extent.ymin);
                    var max = webMercatorUtils_1.default.xyToLngLat(extent.xmax, extent.ymax);
                    this.socket.emit("loadPointsByCoords", min[0], max[0], min[1], max[1]);
                };
                PatientMapComponent.prototype.addIfBetween = function (point) {
                    if (!this.view.extent)
                        return;
                    var extent = this.view.extent;
                    var min = webMercatorUtils_1.default.xyToLngLat(extent.xmin, extent.ymin);
                    var max = webMercatorUtils_1.default.xyToLngLat(extent.xmax, extent.ymax);
                    var pointModel = new point_model_1.PointModel;
                    pointModel.fromPoint(point);
                    if (point.between(min, max))
                        this.mapService.addPoint(pointModel, false);
                };
                PatientMapComponent = __decorate([
                    core_1.Component({
                        selector: 'patient-map',
                        templateUrl: './app/patient-map.component.html'
                    }), 
                    __metadata('design:paramtypes', [map_service_1.MapService, core_1.ElementRef, communication_service_1.CommunicationService])
                ], PatientMapComponent);
                return PatientMapComponent;
            }());
            exports_1("PatientMapComponent", PatientMapComponent);
        }
    }
});
//# sourceMappingURL=patient-map.component.js.map