System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PointModel;
    return {
        setters:[],
        execute: function() {
            PointModel = (function () {
                function PointModel() {
                }
                PointModel.prototype.fromPoint = function (point) {
                    this._id = point._id;
                    this.firstName = point.firstName;
                    this.lastName = point.lastName;
                    this.phone = point.phone;
                    this.email = point.email;
                    this.bloodGroup = point.bloodGroup;
                    this.longitude = point.longitude;
                    this.latitude = point.latitude;
                    this.address = point.address;
                    this.ip = point.ip;
                };
                PointModel.prototype.fromFeatures = function (attributes) {
                    this._id = attributes._id;
                    this.firstName = attributes.firstName;
                    this.lastName = attributes.lastName;
                    this.phone = attributes.phone;
                    this.email = attributes.email;
                    this.bloodGroup = attributes.bloodGroup;
                    this.longitude = attributes.longitude;
                    this.latitude = attributes.latitude;
                    this.address = attributes.address;
                    this.ip = attributes.ip;
                };
                PointModel.prototype.between = function (min, max) {
                    return min[0] <= this.longitude && this.longitude <= max[0] && min[1] <= this.latitude && this.latitude <= max[1];
                };
                return PointModel;
            }());
            exports_1("PointModel", PointModel);
        }
    }
});
//# sourceMappingURL=point.model.js.map