import { DatePipe } from '@angular/common';
import { OpenDataService } from './../open-data-service';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sbz-weather',
  imports: [MatCardModule, DatePipe, CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather {

  temperature: number | null = null;
  luftfeuchtigkeit: number | null = null;
  pressure: number | null = null;
  flowrate: number | null = null;

  forecastDate: string | null = null;
  forecastMinTemp: number | null = null;
  forecastMaxTemp: number | null = null;
  forecastSunshineDuration: number | null = null;
  forecastPrecipitationProbability: number | null = null;
  forecastPrecipitation: number | null = null;
  forecastWeatherDesc: any = null;

  constructor(private odService: OpenDataService){}

  ngOnInit(){
    this.loadWeather();
    this.loadWeatherForecast();
  }

  async loadWeather(){
    try{
      const allData = await this.odService.getRealtimeWeather();

      if(allData){
        this.temperature = allData.t ? parseFloat(allData.t) : null;
        this.luftfeuchtigkeit = allData.rh ? parseFloat(allData.rh) : null;
        this.pressure = allData.p ? parseFloat(allData.p) : null;
        this.flowrate = allData.n ? parseFloat(allData.n) : null;

        if(typeof this.flowrate === "number" && !Number.isNaN(this.temperature)){}
      }
    }catch(error){
      console.error(error);
    }
  }

  async loadWeatherForecast(){
    try{
      const allData = await this.odService.getForecastWeather();

      console.log("Daten erhalten", allData);

  if (allData && allData.ForeCastDaily && allData.ForeCastDaily.length > 1) {

    const tomorrowData = allData.ForeCastDaily[2];

    this.forecastDate = tomorrowData.Date ? tomorrowData.Date : null;

    this.forecastMinTemp = tomorrowData.MinTemp ?? null;
    this.forecastMaxTemp = tomorrowData.MaxTemp ?? null;
    this.forecastSunshineDuration = tomorrowData.SunshineDuration ?? null;
    this.forecastPrecipitationProbability = tomorrowData.PrecipitationProbability ?? null;

    this.forecastPrecipitation = tomorrowData.Precipitation ?? null;

    this.forecastWeatherDesc = tomorrowData.WeatherDesc ?? null;

  }

    }catch(error){
      console.error(error);
    }
  }
}
