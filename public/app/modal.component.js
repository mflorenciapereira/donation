System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var Modal, modal_id;
    function uniqueId(prefix) {
        return prefix + ++modal_id;
    }
    exports_1("uniqueId", uniqueId);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Modal = (function () {
                function Modal(_rootNode) {
                    this._rootNode = _rootNode;
                    this.showClose = true;
                    this.onClose = new core_1.EventEmitter();
                    this.modalEl = null;
                    this.id = uniqueId('modal_');
                }
                Modal.prototype.open = function () {
                    this.modalEl.modal('show');
                };
                Modal.prototype.close = function () {
                    this.modalEl.modal('hide');
                };
                Modal.prototype.closeInternal = function () {
                    this.onClose.next(null); // emit event
                    this.close();
                };
                Modal.prototype.ngAfterViewInit = function () {
                    this.modalEl = $(this._rootNode.nativeElement).find('div.modal');
                };
                Modal.prototype.has = function (selector) {
                    return $(this._rootNode.nativeElement).find(selector).length;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Modal.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Modal.prototype, "showClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Modal.prototype, "onClose", void 0);
                Modal = __decorate([
                    core_1.Component({
                        selector: 'modal',
                        templateUrl: './app/modal.html',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Modal);
                return Modal;
            }());
            exports_1("Modal", Modal);
            modal_id = 0;
        }
    }
});
//# sourceMappingURL=modal.component.js.map