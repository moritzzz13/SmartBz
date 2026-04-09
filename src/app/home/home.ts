import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CdkAriaLive } from "../../../node_modules/@angular/cdk/types/_a11y-module-chunk";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sbz-home',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  temperature: number = 21;
  mood: string = 'sonnig';
  
  constructor(
    private router: Router
  ) {}


  routeToWeather() {
    this.router.navigate(['/weather']);
  }

  routeToTraffic() {
    this.router.navigate(['/traffic']);
  }
}
