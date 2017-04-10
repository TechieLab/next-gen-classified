import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsService } from './settings.service';


@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  selectedItem: any;
  selected: any;
  availableThemes: {className: string, prettyName: string}[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private _settings: SettingsService) {
    // If we navigated to this page, we will have an item available as a nav param
    this._settings.getTheme().subscribe(val => this.selected = val);
    this.selectedItem = navParams.get('item');
    this.availableThemes = this._settings.availableThemes;
  }

  public setTheme(e) {
    this._settings.setTheme(e);
 }
}
