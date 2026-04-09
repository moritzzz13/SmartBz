import { Component, Inject } from '@angular/core';
import { TrafficEvent } from '../traffic-event';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'sbz-traffic-detail',
  imports: [],
  templateUrl: './traffic-detail.html',
  styleUrl: './traffic-detail.scss',
})
export class TrafficDetail {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TrafficEvent) {}
}
