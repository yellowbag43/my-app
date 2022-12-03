import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HomescreenService } from './services/homescreen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  valid: boolean = true;
  
  constructor(private primengConfig: PrimeNGConfig,
              private homeScreen: HomescreenService) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.valid = this.homeScreen.getScreenFlag();
    }


  getScreenStatus() {
//    console.log("Screen is "+this.homeScreen.getScreenFlag())
    return this.homeScreen.getScreenFlag();
  }
}
