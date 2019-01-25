import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.agmApiKey
    })
  ],
  providers: []
})
export class MapModule { }
