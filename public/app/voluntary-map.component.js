System.register(['@angular/core', './map.service', './point.model', './modal.component', './communication.service'], function(exports_1, context_1) {
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
    var core_1, map_service_1, point_model_1, modal_component_1, communication_service_1;
    var VoluntaryMapComponent;
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
            function (modal_component_1_1) {
                modal_component_1 = modal_component_1_1;
            },
            function (communication_service_1_1) {
                communication_service_1 = communication_service_1_1;
            }],
        execute: function() {
            VoluntaryMapComponent = (function () {
                function VoluntaryMapComponent(mapService, elementRef, communicationService) {
                    this.mapService = mapService;
                    this.elementRef = elementRef;
                    this.communicationService = communicationService;
                    this.socket = null;
                    this.point = new point_model_1.PointModel();
                    this._modal = null;
                    this.error = '';
                    this.ok = '';
                    this.submitted = false;
                    this.active = true;
                }
                VoluntaryMapComponent.prototype.ngOnInit = function () {
                    var me = this;
                    this.socket = this.communicationService.connect();
                    this.socket.on('pointAddedResult', function (result) {
                        if (result.error) {
                            this.error = result.error;
                            this.active = true;
                        }
                        else {
                            this.ok = "Voluntary added successfully. Thank you!";
                        }
                    }.bind(this));
                    this.socket.on('userPointsLoaded', function (user) {
                        if (user == null)
                            return;
                        var points = [];
                        points = me.convertPoints(user.points);
                        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                            var point = points_1[_i];
                            this.mapService.addPoint(point, true);
                        }
                    }.bind(this));
                    this.socket.on('pointAdded', function (point) {
                        var pointModel = new point_model_1.PointModel;
                        pointModel.fromPoint(point);
                        this.mapService.addPoint(pointModel, true);
                    }.bind(this));
                    this.socket.on('pointDeleted', function (result) {
                        if (!result.error) {
                            this.mapService.removePoint(result.id);
                        }
                    }.bind(this));
                    navigator.geolocation.getCurrentPosition(function (position) {
                        me.renderView(position);
                    });
                };
                VoluntaryMapComponent.prototype.editPoint = function (feature) {
                    this.point = this.mapService.fromFeatures(feature.attributes);
                    this.open(this.point.latitude, this.point.longitude);
                };
                VoluntaryMapComponent.prototype.deletePoint = function (feature) {
                    var point = this.mapService.fromFeatures(feature.attributes);
                    this.socket.emit("deletePoint", point._id);
                };
                VoluntaryMapComponent.prototype.renderView = function (position) {
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
                    //Actions
                    this.view.on("click", function (evt) {
                        this.point = new point_model_1.PointModel;
                        var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
                        var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
                        if (!me.view.popup.visible) {
                            me.open(evt.mapPoint.latitude, evt.mapPoint.longitude);
                        }
                        me.view.popup.on("trigger-action", function (evt2) {
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
                };
                VoluntaryMapComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                    this.socket.emit('addPoint', this.point, this.userId);
                };
                VoluntaryMapComponent.prototype.bindModal = function (modal) {
                    this._modal = modal;
                };
                VoluntaryMapComponent.prototype.open = function (lat, lon) {
                    this.ok = '';
                    this.error = '';
                    this.submitted = false;
                    this.active = true;
                    this.point.latitude = lat;
                    this.point.longitude = lon;
                    this._modal.open();
                };
                VoluntaryMapComponent.prototype.close = function () {
                    this._modal.close();
                    this.submitted = false;
                    this.active = false;
                };
                VoluntaryMapComponent.prototype.convertPoints = function (points) {
                    var pointsConverted = [];
                    for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
                        var point = points_2[_i];
                        var pointModel = new point_model_1.PointModel();
                        pointModel.fromPoint(point);
                        pointsConverted.push(pointModel);
                    }
                    return pointsConverted;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], VoluntaryMapComponent.prototype, "userId", void 0);
                VoluntaryMapComponent = __decorate([
                    core_1.Component({
                        selector: 'voluntary-map',
                        templateUrl: './app/voluntary-map.component.html',
                        directives: [modal_component_1.Modal]
                    }), 
                    __metadata('design:paramtypes', [map_service_1.MapService, core_1.ElementRef, communication_service_1.CommunicationService])
                ], VoluntaryMapComponent);
                return VoluntaryMapComponent;
            }());
            exports_1("VoluntaryMapComponent", VoluntaryMapComponent);
        }
    }
});
//# sourceMappingURL=voluntary-map.component.js.map