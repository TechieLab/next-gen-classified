import {Component, OnInit, ElementRef} from '@angular/core';
import {HomePage} from '../home/home.page';
import {SettingsPage} from '../settings/settings.page';
import {Welcome} from '../welcome/welcome.page';

@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Skip" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="SignIn" [root]="SignInPage"></ion-tab>
    </ion-tabs>
`,
  entryComponents: [Welcome]
})

export class LoginPage implements OnInit { 
  rootPage = Welcome;
  SignInPage = SignInPage;
  constructor() {
    
  }  

  ngOnInit(){

  }
}

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  providers: []  
})

export class SignInPage implements OnInit { 

  constructor() {
    
  }  

  ngOnInit(){

  }
}
