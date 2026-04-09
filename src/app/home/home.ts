import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CdkAriaLive } from "../../../node_modules/@angular/cdk/types/_a11y-module-chunk";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { OpenDataService } from '../open-data-service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'sbz-home',
  imports: [MatCardModule, MatButtonModule, MatSnackBarModule, MatProgressBarModule ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  temperature!: number;
  mood!: string;

  
  constructor(
    private router: Router,
    private sb: MatSnackBar,
    private odService: OpenDataService
  ) {}


  ngOnInit() {
    this.odService.getTemperature()
      .then(ret => {
        this.temperature = ret;

        const temp = parseFloat(ret);

        if (temp < 0) {
          this.mood = "cold";
        } else if (temp < 10) {
          this.mood = "cool";
        } else if (temp < 20) {
          this.mood = "mild";
        } else {
          this.mood = "warm";
        }
    })
      .catch(error => this.odService.showErrorSnackBar(error.message));
  }

  routeToWeather() {
    this.router.navigate(['/weather']);
  }

  routeToTraffic() {
    this.router.navigate(['/traffic']);
  }
}
