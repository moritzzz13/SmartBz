import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, lastValueFrom, map } from "rxjs";

const WEATHER_URL =
  'https://tourism.api.opendatahub.com/v1/Weather';

@Injectable({ providedIn: 'root' })
export class OpenDataService {

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar
  ) {}

  getRealtimeTemperature(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${WEATHER_URL}/Realtime/1242`)
  );
  }


  showErrorSnackBar(error: string) {
    this.sb.open(
      `Verbindung zur OpenData-API fehlgeschlagen: ${error}`,
      'OK',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }
}
