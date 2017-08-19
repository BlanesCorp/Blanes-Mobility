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
import { Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { NotificationPage } from '../pages/notification/notification';
import { SupportPage } from '../pages/support/support';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.pages = [
            {
                title: 'Home',
                icon: 'ios-home-outline',
                count: 0,
                component: HomePage
            },
            {
                title: 'History',
                icon: 'ios-time-outline',
                count: 0,
                component: HistoryPage
            },
            {
                title: 'Notification',
                icon: 'ios-notifications-outline',
                count: 2,
                component: NotificationPage
            },
            {
                title: 'Support',
                icon: 'ios-help-circle-outline',
                count: 0,
                component: SupportPage
            },
            {
                title: 'Logout',
                icon: 'ios-log-out-outline',
                count: 0,
                component: LoginPage
            }
        ];
        this.rootPage = HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        queries: {
            nav: new ViewChild('content')
        }
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map