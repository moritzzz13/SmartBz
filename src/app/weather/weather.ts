import { OpenDataService } from './../open-data-service';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'sbz-weather',
  imports: [],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather {

  temperatur: number | null = null;
  luftfeuchtigkeit: string = "";

  constructor(private odService: OpenDataService){}

  ngOnInit(){
    this.loadWeather();
  }

  async loadWeather(){
    try{
      const allData = await this.odService.getRealtimeTemperature();
      console.log("Daten vom Server erhalten", allData)

      if(allData){
        this.temperatur = allData.t ? parseFloat(allData.t) : null;
      }
    }catch(error){
      console.error(error);
    }
  }
}
