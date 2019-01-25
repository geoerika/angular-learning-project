import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCArokX5qOSOk7V7KnV6JZ_4TgDpMJpxrY '
    })
  ],
  providers: []
})
export class MapModule { }
