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

import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/info/info';
import { LostFoundPage } from '../pages/lost-found/lost-found';
import { ConfigPage } from '../pages/config/config';
import { TermsPage } from '../pages/terms/terms';


@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;
  
  public nav: any;

  public pages = [
    {
      title: 'Sua Conta',
      icon: 'ios-home-outline',
      count: 0,
      component: ProfilePage
    },
    {
      title: 'Informações',
      icon: 'ios-home-outline',
      count: 0,
      component: InfoPage
    },
    {
      title: 'Histórico de Viagens',
      icon: 'ios-time-outline',
      count: 0,
      component: HistoryPage
    },
    {
      title: 'Notificações',
      icon: 'ios-notifications-outline',
      count: 2,
      component: NotificationPage
    },
    {
      title: 'Achados e Perdidos',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: LostFoundPage
    },
    {
      title: 'Configurações',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: ConfigPage
    },
    {
      title: 'Suporte',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: SupportPage
    },
    {
      title: 'Sair',
      icon: 'ios-log-out-outline',
      count: 0,
      component: LoginPage
    }
  ];



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


