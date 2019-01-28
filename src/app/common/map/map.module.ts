import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';
import { environment } from '../../../environments/environment';
import { CamelizePipe } from 'ngx-pipes';

import { MapService } from './map.service';


@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDuLLmvl1bCGjhxjfd-qIhHeJttVHecAI'
    })
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
