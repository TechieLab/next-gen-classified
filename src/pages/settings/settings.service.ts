import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SettingsService {
   
    private theme: BehaviorSubject<String>;  
    availableThemes: {className: string, prettyName: string}[];

    constructor() {
       
        this.theme = new BehaviorSubject('rp-theme');
        this.availableThemes = [
            {className: 'rp-theme', prettyName: 'RealPage'},
            {className: 'ion-theme', prettyName: 'ionic'}
        ];
    }


    setTheme(val) {
        this.theme.next(val);
    }

    getTheme() {
        return this.theme.asObservable();
    }
}