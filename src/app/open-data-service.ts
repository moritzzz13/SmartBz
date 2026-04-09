import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, lastValueFrom, map } from "rxjs";
import { TrafficEvent } from "./traffic-event";

const WEATHER_URL ='https://tourism.api.opendatahub.com/v1/Weather';
const TRAFFIC_URL = 'https://mobility.api.opendatahub.com/v2/flat%2Cevent/%2A/latest?limit=200&offset=0&shownull=false&distinct=true';


@Injectable({ providedIn: 'root' })
export class OpenDataService {

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar
  ) {}

  /**********************************************
  *                                              *
  *     WETTER API                               *
  *                                              *
  ************************************************/

  getRealtimeTemperature(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${WEATHER_URL}/Realtime/1242`)
  );
  }




  /**********************************************
  *                                              *
  *     TRAFFIC API                              *
  *                                              *
  ************************************************/


  getTrafficEvents(): Promise<TrafficEvent[]> {
    return lastValueFrom(
      this.http.get<any>(TRAFFIC_URL)
    ).then(response => {

      const now = new Date();

      return response.data
        //nur gültige Meldungen
        /*
        .filter((ev: any) => {
          const end = new Date(ev.evend);
          return end >= now;
        })
        */

        //Mapping API → TrafficEvent
        .map((ev: any) => {

          const coords = ev.evlgeometry?.coordinates;

          return new TrafficEvent(
            ev.evmetadata?.tycodeValue ?? 'UNKNOWN',
            ev.evmetadata?.messageStreetWapDescDe
              ?? ev.evmetadata?.messageStreetInternetDescDe
              ?? 'Unbekannter Ort',
            ev.evmetadata?.placeDe ?? 'Keine Beschreibung',
            new Date(ev.evstart),
            new Date(ev.evend),
            coords?.[1] ?? 0,   // lat
            coords?.[0] ?? 0,   // lng
            new Date(ev.evmetadata?.publisherDateTime)
          );
        })

        //neueste zuerst
        .sort((a: TrafficEvent, b: TrafficEvent) =>
          b.publishedAt.getTime() - a.publishedAt.getTime()
        );
    });
  }



  /**********************************************
  *                                              *
  *     HILFSMETHODEN                            *
  *                                              *
  ************************************************/


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
