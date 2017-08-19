var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _this = this;
//import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';
import L from "leaflet";
//Coordinates, PositionError
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { PlacesPage } from '../places/places';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { FindingPage } from "../finding/finding";
var GEOLOCATION_OPTIONS = {
    maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
};
/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(navCtrl, navParams, platform, alertCtrl, geolocation, geocoder, toastCtrl, locac) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.geocoder = geocoder;
        this.toastCtrl = toastCtrl;
        this.locac = locac;
        // map id
        this.mapId = Math.random() + 'map';
        // map height
        this.mapHeight = 480;
        // show - hide booking form
        this.showForm = false;
        // show - hide modal bg
        this.showModalBg = false;
        // list vehicles
        this.vehicles = [
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
        ];
    }
    HomePage.prototype.geocodeAddress = function (geocoder, resultsMap) {
        geocoder.geocode({ 'address': "Sorocaba" }, function (results, status) {
            //  var address = document.getElementById('address').value;
            //  geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                //  var marker = new google.maps.Marker({
                //  map: resultsMap,
                //  position: results[0].geometry.location
                //  });
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    HomePage.prototype.geolocate = function () {
        var _this = this;
        var options = {
            enableHighAccuracy: true
        };
        this.locac.canRequest().then(function (res) {
            if (res) {
                _this.locac.request(_this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    _this.geolocation.getCurrentPosition(options).then(function (position) {
                        _this.getcountry(position);
                    }).catch(function (err) {
                        alert(err);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        });
    };
    HomePage.prototype.getcountry = function (pos) {
        var _this = this;
        this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then(function (res) {
            var country = _this.toastCtrl.create({
                message: res.countryName,
                duration: 4000
            });
            country.present();
            // alert(res.countryName);
        });
    };
    /*
    street  string  The street.
    houseNumber  string  The house number.
    postalCode  string  The postal code.
    city  string  The city.
    district  string  The district.
    countryName  string  The country name.
    countryCode  string  The country code.
    */
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
        // set map center
        // this.center = [48.137154, 11.576124]; //Munich
        this.center = [48.775556, 9.182778]; //Stuttgart
        // setup leaflet map
        this.initMap();
        // init google map
        //this.initializeMap();
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        AlertController,
        Geolocation,
        NativeGeocoder,
        ToastController,
        LocationAccuracy])
], HomePage);
export { HomePage };
this.mapId;
initMap();
{
    this.map = L.map('map', {
        center: this.center,
        zoom: 13
    });
    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
        .addTo(this.map);
}
toggleFollow();
{
    this.following = !this.following;
    if (this.following) {
        this.startFollow();
    }
    else {
        this.stopFollow();
    }
}
startFollow();
{
    this.geolocationSubscription = this.geolocation.watchPosition(GEOLOCATION_OPTIONS)
        .subscribe(function (position) {
        _this.updateGeoposition(position);
    });
}
stopFollow();
{
    this.geolocationSubscription.unsubscribe();
}
updateGeoposition(position, Geoposition);
{
    console.log(position.coords.longitude + ' ' + position.coords.latitude);
    //create Point
    var latlng = { lat: position.coords.latitude, lng: position.coords.longitude, date: new Date() };
    if (this.positionMarker) {
        this.positionMarker.setLatLng(latlng);
        this.positionAccuracyCircle.setLatLng(latlng).setRadius(position.coords.accuracy);
    }
    else {
        this.positionMarker = L.marker(latlng).addTo(this.map);
        this.positionAccuracyCircle = L.circle(latlng, { radius: position.coords.accuracy }).addTo(this.map);
    }
    //Set Center
    this.map.setView(latlng, 13);
}
// toggle form
toggleForm();
{
    this.showForm = !this.showForm;
    this.showModalBg = (this.showForm == true);
}
// toggle active vehicle
toggleVehicle(index);
{
    for (var i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].active = (i == index);
    }
}
initializeMap();
{
    var latLng = void 0;
    //let latLng = new google.maps.LatLng(21.0318202, 105.8495298);
    //let latLng = new google.maps.LatLng(-23.5006140, -47.4431510); // Jo
    var mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
    };
    this.map = new google.maps.Map(document.getElementById(this.mapId), mapOptions);
    var geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder, this.map);
    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
    var infoHeight = document.getElementsByClassName('booking-info')[0].scrollHeight;
    // get booking form height
    var bookingHeight = document.getElementsByClassName('booking-form')[0].scrollHeight;
    // set map height = view height - info block height + booking form height
    this.mapHeight = viewHeight - infoHeight + bookingHeight;
    var options = { timeout: 120000, enableHighAccuracy: true };
    // refresh map
    setTimeout(function () {
        google.maps.event.trigger(_this.map, 'resize');
    }, 300);
    // use GPS to get center position
    navigator.geolocation.getCurrentPosition(function (position) {
        var newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //        this.map.setCenter(newLatLng);
        new google.maps.Marker({
            map: _this.map,
            animation: google.maps.Animation.DROP,
            position: _this.map.getCenter()
        });
    }, function (error) {
        console.log(error);
    }, options);
}
// Show note popup when click to 'Notes to driver'
showNotePopup();
{
    var prompt_1 = this.alertCtrl.create({
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
                handler: function (data) {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Save',
                handler: function (data) {
                    console.log('Saved clicked');
                }
            }
        ]
    });
    prompt_1.present();
}
;
// Show promote code popup when click to 'Promote Code'
showPromoPopup();
{
    var prompt_2 = this.alertCtrl.create({
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
                handler: function (data) {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Save',
                handler: function (data) {
                    console.log('Saved clicked');
                }
            }
        ]
    });
    prompt_2.present();
}
;
// go to next view when the 'Book' button is clicked
book();
{
    // hide booking form
    this.toggleForm();
    // go to finding page
    this.navCtrl.push(FindingPage);
}
// choose pickup place
choosePlace();
{
    // go to places page
    this.navCtrl.push(PlacesPage);
}
// choose payment method
choosePaymentMethod();
{
    // go to payment method page
    this.navCtrl.push(PaymentMethodPage);
}
//# sourceMappingURL=home.js.map