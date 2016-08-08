System.register(['@angular/platform-browser-dynamic', '@angular/forms', './app.routes', './main.component', './map.service', './communication.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, forms_1, app_routes_1, main_component_1, map_service_1, communication_service_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (communication_service_1_1) {
                communication_service_1 = communication_service_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(main_component_1.MainComponent, [
                map_service_1.MapService,
                communication_service_1.CommunicationService,
                app_routes_1.appRouterProviders,
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms()
            ])
                .catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=main.js.map