import {bootstrap}    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { appRouterProviders } from './app.routes';

import {MainComponent} from './main.component';

import { MapService } from './map.service';
import { CommunicationService } from './communication.service';

bootstrap(MainComponent, 
[
  MapService, 
  CommunicationService, 
  appRouterProviders,   
  disableDeprecatedForms(), 
  provideForms()
])
  .catch((err: any) => console.error(err));
