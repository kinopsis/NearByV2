import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})

export class HomePage {
  map: GoogleMap;
  crd: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {

      this.getMap();

    });
  }


  getMap() {
    Geolocation.getCurrentPosition().then((position) => {

      let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);
      this.map = new GoogleMap('map', {
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Le map is ready!');
      });
    }, (err) => {
      console.log(err);
    });
  }
}