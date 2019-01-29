import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() location: string;
  isPositionError: boolean = false;

  lat: number;
  lng: number;

  constructor(private mapService: MapService,
              private ref:ChangeDetectorRef) { } //to avoid an empty map at the beginning on the page

  mapReadyHandler() {

    // let currentLocation = this.location;
    // if (Math.round(Math.random() * 10) > 5) { //random function to test if error location message appears on the screen
    //   currentLocation = "sadad78asd6a87d"
    // }

    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      }, () => {
        this.isPositionError = true;
      });
  }
}
