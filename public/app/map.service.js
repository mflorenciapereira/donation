System.register(['@angular/core', 'esri/Map', 'esri/layers/GraphicsLayer', './point.model', 'esri/Graphic', 'esri/geometry/Point', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/SpatialReference', 'esri/views/MapView', 'esri/widgets/Locate', 'esri/widgets/Search'], function(exports_1, context_1) {
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
    var core_1, Map_1, GraphicsLayer_1, point_model_1, Graphic_1, Point_1, PictureMarkerSymbol_1, SpatialReference_1, MapView_1, Locate_1, Search_1;
    var MapService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Map_1_1) {
                Map_1 = Map_1_1;
            },
            function (GraphicsLayer_1_1) {
                GraphicsLayer_1 = GraphicsLayer_1_1;
            },
            function (point_model_1_1) {
                point_model_1 = point_model_1_1;
            },
            function (Graphic_1_1) {
                Graphic_1 = Graphic_1_1;
            },
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (PictureMarkerSymbol_1_1) {
                PictureMarkerSymbol_1 = PictureMarkerSymbol_1_1;
            },
            function (SpatialReference_1_1) {
                SpatialReference_1 = SpatialReference_1_1;
            },
            function (MapView_1_1) {
                MapView_1 = MapView_1_1;
            },
            function (Locate_1_1) {
                Locate_1 = Locate_1_1;
            },
            function (Search_1_1) {
                Search_1 = Search_1_1;
            }],
        execute: function() {
            MapService = (function () {
                function MapService() {
                    this.defaultSymbol = new PictureMarkerSymbol_1.default({
                        "url": "./app/img/pin.png",
                        "height": 20,
                        "width": 12
                    });
                    this.editAction = {
                        // This text is displayed as a tooltip
                        title: "Edit",
                        // The ID by which to reference the action in the event handler
                        id: "edit",
                        // Sets the icon font used to style the action button
                        className: "esri-icon-edit",
                    };
                    this.deleteAction = {
                        // This text is displayed as a tooltip
                        title: "Delete",
                        // The ID by which to reference the action in the event handler
                        id: "delete",
                        // Sets the icon font used to style the action button
                        className: "esri-icon-trash",
                    };
                    this.pTemplate = {
                        title: "Voluntary data",
                        content: "First name: {firstName}<br>Last name: {lastName}<br>Address: {address}<br>Phone: <span name=\"{phone}\" id=\"phonePopup\"><a onClick=\"document.getElementById('phonePopup').innerHTML = document.getElementById('phonePopup').attributes.name.value\">Show phone</a></span><br>Email:  <span name=\"{email}\" id=\"emailPopup\"><a onClick=\"document.getElementById('emailPopup').innerHTML = document.getElementById('emailPopup').attributes.name.value\">Show email</a></span><br>Blood group: {bloodGroup}<br>"
                    };
                    this.map = new Map_1.default({
                        basemap: 'topo'
                    });
                    this.pointGraphicsLayer = new GraphicsLayer_1.default();
                    this.map.add(this.pointGraphicsLayer);
                }
                MapService.prototype.addPoint = function (point, addActions) {
                    var graphic = new Graphic_1.default({
                        geometry: new Point_1.default({
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
                    if (addActions) {
                        graphic.popupTemplate.actions.push(this.editAction);
                        graphic.popupTemplate.actions.push(this.deleteAction);
                    }
                    this.pointGraphicsLayer.graphics.add(graphic);
                };
                MapService.prototype.removePoint = function (id) {
                    for (var _i = 0, _a = this.pointGraphicsLayer.graphics.toArray(); _i < _a.length; _i++) {
                        var graphic = _a[_i];
                        if (graphic.attributes._id == id) {
                            this.pointGraphicsLayer.graphics.remove(graphic);
                            break;
                        }
                    }
                };
                MapService.prototype.fromFeatures = function (attributes) {
                    var point = new point_model_1.PointModel;
                    point.fromFeatures(attributes);
                    return point;
                };
                MapService.prototype.convertPoints = function (points) {
                    var pointsConverted = [];
                    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                        var point = points_1[_i];
                        var pointModel = new point_model_1.PointModel();
                        pointModel.fromPoint(point);
                        pointsConverted.push(pointModel);
                    }
                    return pointsConverted;
                };
                MapService.prototype.createView = function (elementRef, position) {
                    return new MapView_1.default({
                        container: elementRef.nativeElement.firstChild,
                        map: this.map,
                        center: new Point_1.default({
                            x: position.coords.longitude,
                            y: position.coords.latitude,
                            spatialReference: new SpatialReference_1.default({ wkid: 4326 })
                        }),
                        zoom: 14
                    });
                };
                MapService.prototype.createLocation = function (view) {
                    var locateBtn = new Locate_1.default({
                        view: view
                    });
                    locateBtn.startup();
                    return locateBtn;
                };
                MapService.prototype.createSearchWidget = function (view) {
                    var searchWidget = new Search_1.default({
                        view: view
                    });
                    searchWidget.startup();
                    return searchWidget;
                };
                MapService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MapService);
                return MapService;
            }());
            exports_1("MapService", MapService);
        }
    }
});
//# sourceMappingURL=map.service.js.map