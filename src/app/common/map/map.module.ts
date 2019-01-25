import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [
{path:'', redirectTo: '/rentals', pathMatch: 'full'}
]

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
