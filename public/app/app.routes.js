System.register(['@angular/router', './voluntary.component', './patient.component', './login.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, voluntary_component_1, patient_component_1, login_component_1;
    var routes, appRouterProviders;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (voluntary_component_1_1) {
                voluntary_component_1 = voluntary_component_1_1;
            },
            function (patient_component_1_1) {
                patient_component_1 = patient_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            routes = [
                {
                    path: 'login',
                    component: login_component_1.LoginComponent
                },
                {
                    path: 'voluntary/:userId',
                    component: voluntary_component_1.VoluntaryComponent
                },
                {
                    path: 'patient',
                    component: patient_component_1.PatientComponent
                },
                {
                    path: '',
                    redirectTo: '/login',
                    pathMatch: 'full'
                },
            ];
            exports_1("appRouterProviders", appRouterProviders = [
                router_1.provideRouter(routes)
            ]);
        }
    }
});
//# sourceMappingURL=app.routes.js.map