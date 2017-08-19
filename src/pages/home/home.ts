
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { PlacesPage } from '../places/places';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { FindingPage } from "../finding/finding";

import leaflet from "leaflet";

declare var google: any;

const GEOLOCATION_OPTIONS: GeolocationOptions = {
   maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
};


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  // map id
  //public mapId = Math.random() + 'map';

  public mapId = 'map2';

  // map height
  public mapHeight: number = 480;

  // show - hide booking form
  public showForm: boolean = false;

  // show - hide modal bg
  public showModalBg: boolean = false;

  // list vehicles
  public vehicles: any = [
    {
      name: 'Particular',
      icon: 'icon-sedan',
      active: false
    },
    {
      name: 'Taxi',
      icon: 'icon-taxi',
      active: false
    },
    {
      name: 'Todos',
      icon: 'icon-f1',
      active: true
    }
  ]

  // Note to driver
  public note: any;

  // Promo code
  public promo: any;

  // Map
  //public map: any;
   
  
  //map: leaflet.Map;
  //center: leaflet.PointTuple;
  following: Boolean;
  positionMarker: leaflet.Marker;
  positionAccuracyCircle: leaflet.Circle;

  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  private geolocationSubscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public platform: Platform,
    public alertCtrl: AlertController,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toastCtrl: ToastController,
    public locac: LocationAccuracy
  ) {}


  geocodeAddress(geocoder, resultsMap) {

    geocoder.geocode({'address': "Sorocaba"}, function(results, status) {
      if (status === 'OK') {

        let latitude = results[0].geometry.location.lat();
        let longitude = results[0].geometry.location.lng();
        
        // resultsMap.setView([latitude, longitude], 14);

//        resultsMap.setView([-23.4720101, -47.4114758], 14);

          //  var marker = new google.maps.Marker({
          //  map: resultsMap,
          //  position: results[0].geometry.location
          //  });
     
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


/*

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };
    this.locac.canRequest().then((res: boolean) => {
      if (res) {
        this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.getcountry(position);
          }).catch((err) => {
               alert(err);
          })
        }, (error) => {
          alert(error);
        })
      }
    })
    
  }
 
  getcountry(pos) {
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
      let country = this.toastCtrl.create({
        message: res.countryName,
        duration: 4000
      });
      country.present();
      // alert(res.countryName);
    })
  }

*/




  // init map
  ionViewDidLoad() {
    this.initializeMap();
  }


  // toggle form
  toggleForm() {
    this.showForm = !this.showForm;
    this.showModalBg = (this.showForm == true);
  }

  // toggle active vehicle
  toggleVehicle(index) {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].active = (i == index);
    }
  }
  

  initializeMap() {

    //let latLng = new google.maps.LatLng(-23.5006140, -47.4431510); // Jo
    let latLng = new google.maps.LatLng(-23.4720101, -47.4114758); // Blanes
    
//    this.center = [-23.5006140, -47.4431510];  // Jo
 //   this.center = [-23.4720101, -47.4114758];  // Blanes
     
    let googleMapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: false
    }

/*   
    var mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>';
   
    var osmAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> xxx' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>';
   

    //var osmAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>';
   // var mbAttr = 'Imagery © <a href="http://mapbox.com">Mapbox</a>';
    var blanesAttr = '&copy; <a href="http://osm.org/copyright">BlanesMap</a>';


    var mbUrl  = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    var grayscale = leaflet.tileLayer( mbUrl,  { id: 'mapbox.light',    attribution: mbAttr });
    var streets   = leaflet.tileLayer( mbUrl,  { id: 'mapbox.streets',  attribution: blanesAttr });
    var osm       = leaflet.tileLayer( osmUrl, { id: 'osm.streets',     attribution: osmAttr });

    var baseLayers = {
      "Grayscale": grayscale,
      "Streets": streets,
      "Osm": osm
    };

    let leafletMapOptions = {
      id: 'mapbox.light',
      //id: 'mapbox.streets',
      center: this.center,
      zoom: 14,
      attribution: blanesAttr,
//      layers: [grayscale, streets],
      accessToken: 'xxx'
 
//      mapTypeId: google.maps.MapTypeId.ROADMAP,
  //    mapTypeControl: true,
    //  zoomControl: true,
     // streetViewControl: false
    }

*/

  //  this.map = new google.maps.Map(this.mapElement.nativeElement, googleMapOptions );


    //this.map = new google.maps.Map(document.getElementById(this.mapId), googleMapOptions);
  
    this.map = new google.maps.Map(document.getElementById('map2'), googleMapOptions);
  
    //this.map = new google.maps.Map(document.getElementsByClassName('map2'), googleMapOptions);


    this.directionsDisplay.setMap(this.map);


  //  this.map = leaflet.map('map', leafletMapOptions);
   // this.map = leaflet.map(document.getElementById('map2'), leafletMapOptions);

    //Add OSM Layer
    //leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);


  //leaflet.control.layers(baseLayers).addTo(this.map);


//    var geocoder = new google.maps.Geocoder();

  //  this.geocodeAddress(geocoder, this.map);

    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
    var infoHeight = document.getElementsByClassName('booking-info')[0].scrollHeight;
    // get booking form height
    var bookingHeight = document.getElementsByClassName('booking-form')[0].scrollHeight;

    // set map height = view height - info block height + booking form height
    this.mapHeight = viewHeight - infoHeight + bookingHeight;

    let options = {timeout: 120000, enableHighAccuracy: true};

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);


  
    // use GPS to get center position
    navigator.geolocation.getCurrentPosition(
      (position) => {
 
      //  let newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // Set Center
//        this.map.setView(newLatLng, 14);

     
        /*
        new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });
        */

      },
      (error) => {
        console.log(error);
      },
      options
    );
  
    
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  toggleFollow() {
    this.following = !this.following;

    if (this.following) {
      this.startFollow();
    } else {
      this.stopFollow();
    }
  }

  startFollow() {
    this.geolocationSubscription = this.geolocation.watchPosition(GEOLOCATION_OPTIONS)
      //.filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.updateGeoposition(position);
      });
  }

  stopFollow() {
    this.geolocationSubscription.unsubscribe();
  }

  updateGeoposition(position: Geoposition) {
    
    //create Point
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude, date: new Date()};

    if (this.positionMarker) {
      this.positionMarker.setLatLng(latlng);
      this.positionAccuracyCircle.setLatLng(latlng).setRadius(position.coords.accuracy);
    } else {
      this.positionMarker = leaflet.marker(latlng).addTo(this.map);
      this.positionAccuracyCircle = leaflet.circle(latlng, {radius: position.coords.accuracy}).addTo(this.map);
    }

  }

  // Show note popup when click to 'Notes to driver'
  showNotePopup() {
    let prompt = this.alertCtrl.create({
      title: 'Notes to driver',
      message: "",
      inputs: [
        {
          name: 'note',
          placeholder: 'Note'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  };

  // Show promote code popup when click to 'Promote Code'
  showPromoPopup() {
    let prompt = this.alertCtrl.create({
      title: 'Promo code',
      message: "",
      inputs: [
        {
          name: 'note',
          placeholder: 'Promo code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  };

  // go to next view when the 'Book' button is clicked
  book() {
    // hide booking form
    this.toggleForm();

    // go to finding page
    this.navCtrl.push(FindingPage);
  }

  // choose pickup place
  choosePlace() {
    // go to places page
    this.navCtrl.push(PlacesPage);
  }

  // choose payment method
  choosePaymentMethod() {
    // go to payment method page
    this.navCtrl.push(PaymentMethodPage);
  }


}

