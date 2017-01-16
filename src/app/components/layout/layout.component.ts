import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
   selector:'layout',
   template: require('./layout.html'),   
   entryComponents: [HeaderComponent]
})

export class LayoutComponent{}