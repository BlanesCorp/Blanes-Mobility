var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { DriverService } from '../../services/driver-service';
import { HomePage } from "../home/home";
/*
  Generated class for the TrackingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TrackingPage = (function () {
    function TrackingPage(nav, driverService, platform, alertCtrl) {
        var _this = this;
        this.nav = nav;
        this.driverService = driverService;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        // map height
        this.mapHeight = 480;
        // get driver info
        this.driver = driverService.getItem(1);
        // show rating popup
        setTimeout(function () {
            _this.showRating();
        }, 3000);
    }
    TrackingPage.prototype.ionViewDidLoad = function () {
        // init map
        this.initializeMap();
    };
    TrackingPage.prototype.initializeMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(21.0318202, 105.8495298);
        var mapOptions = {
            center: latLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        // get ion-view height
        var viewHeight = window.screen.height - 44; // minus nav bar
        // get info block height
        var infoHeight = document.getElementsByClassName('tracking-info')[0].scrollHeight;
        this.mapHeight = viewHeight - infoHeight;
        var options = { timeout: 120000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(function (position) {
            var newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.map.setCenter(newLatLng);
            new google.maps.Marker({
                map: _this.map,
                animation: google.maps.Animation.DROP,
                position: _this.map.getCenter()
            });
        }, function (error) {
            console.log(error);
        }, options);
        // refresh map
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 300);
    };
    // show rating popup
    TrackingPage.prototype.showRating = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Thank you',
            message: 'We hope you have enjoyed your ride, For comments, compliments or enquiries, please write to us below',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                        _this.nav.setRoot(HomePage);
                    }
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        console.log('Saved clicked');
                        _this.nav.setRoot(HomePage);
                    }
                }
            ]
        });
        prompt.present();
    };
    return TrackingPage;
}());
TrackingPage = __decorate([
    Component({
        selector: 'page-tracking',
        templateUrl: 'tracking.html'
    }),
    __metadata("design:paramtypes", [NavController, DriverService, Platform,
        AlertController])
], TrackingPage);
export { TrackingPage };
//# sourceMappingURL=tracking.js.map