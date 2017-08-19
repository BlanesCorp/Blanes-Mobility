var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
// import services
import { DriverService } from '../services/driver-service';
import { NotificationService } from '../services/notification-service';
import { PlaceService } from '../services/place-service';
import { TripService } from '../services/trip-service';
// end import services
// import pages
import { DriverPage } from '../pages/driver/driver';
import { FindingPage } from '../pages/finding/finding';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ModalRatingPage } from '../pages/modal-rating/modal-rating';
import { NotificationPage } from '../pages/notification/notification';
import { PaymentMethodPage } from '../pages/payment-method/payment-method';
import { PlacesPage } from '../pages/places/places';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { SupportPage } from '../pages/support/support';
import { TrackingPage } from '../pages/tracking/tracking';
// end import pages
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            DriverPage,
            FindingPage,
            HistoryPage,
            HomePage,
            LoginPage,
            ModalRatingPage,
            NotificationPage,
            PaymentMethodPage,
            PlacesPage,
            ProfilePage,
            RegisterPage,
            SupportPage,
            TrackingPage
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            DriverPage,
            FindingPage,
            HistoryPage,
            HomePage,
            LoginPage,
            ModalRatingPage,
            NotificationPage,
            PaymentMethodPage,
            PlacesPage,
            ProfilePage,
            RegisterPage,
            SupportPage,
            TrackingPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            DriverService,
            NotificationService,
            PlaceService,
            Geolocation,
            NativeGeocoder,
            LocationAccuracy,
            TripService
            /* import services */
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map