import {Component, OnInit, ElementRef , Inject} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home.page';
import {LoginPage} from '../account/login.page';
import { AccountService, IAccountService } from '../account/account.service';

@Component({
  selector: 'welcome-page',
  templateUrl: 'welcome.html', 
  entryComponents:[LoginPage],
  providers: [AccountService]  
})

export class Welcome implements OnInit { 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    @Inject(AccountService) public accountService: IAccountService) {
    
  }  

  ngOnInit(){
      this.accountService.logout();
  }

  gotoDashboardPage(){
          this.navCtrl.setRoot(HomePage, { category : 'Dashboard' });
    }

   gotoLoginPage(){
          this.navCtrl.setRoot(LoginPage, { category : 'SignIn' });
    }

}