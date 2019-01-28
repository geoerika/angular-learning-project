import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';


@Injectable()

export class MapService {

  private geoCoder;
  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) {}

  private cacheLocation(location: string, coordinates: any) {
    const camelizedLocation = this.camelizePipe.transform(location);
    this.locationCache[camelizedLocation] = coordinates;
  }

  public geocodeLocation(location: string): Observable<any> {

    this.geoCoder = new (<any>window).google.maps.Geocoder();

    return new Observable((observer) => {

      this.geoCoder.geocode({address: location}, (result, status) => {

        if(status === 'OK') {
          const geometry = result[0].geometry.location;
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};

          this.cacheLocation(location, coordinates);
          observer.next(coordinates);
        } else {
          observer.error('location could not be geocoded');
        }

      })

    });
  }

}
