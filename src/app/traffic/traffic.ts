import { Component, inject } from '@angular/core';
import { OpenDataService } from '../open-data-service';
import { TrafficEvent } from '../traffic-event';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, NgModel } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TrafficDetail } from '../traffic-detail/traffic-detail';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'sbz-traffic',
  imports: [ MatCardModule, MatButtonModule, MatProgressBarModule, FormsModule, MatCheckboxModule, MatDialogModule ],
  templateUrl: './traffic.html',
  styleUrl: './traffic.scss',
})
export class Traffic {

  validTrafficEvents!: TrafficEvent[];
  allTrafficEvents!: TrafficEvent[];
  showValid: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private odService: OpenDataService,
  ) {}


  ngOnInit() { 
    this.odService.getTrafficEvents()
      .then(result => {
        this.allTrafficEvents = result;

        //soriteren nach nur valid TrafficEvents
        const now = new Date();
        this.validTrafficEvents = this.allTrafficEvents
          .filter((ev: any) => {
            const end = new Date(ev.evend);
            return end >= now;
        })
      })
      .catch(error => this.odService.showErrorSnackBar(error))
  }


  openTrafficDetail(e: TrafficEvent) {
    const dialogRef = this.dialog.open(TrafficDetail, {data: e})
    //TODO: dialogfenster erstellen für trafficDetail
  }
}
