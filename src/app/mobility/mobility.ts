import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OpenDataService } from '../open-data-service';

@Component({
  selector: 'sbz-mobility',
  standalone: true,
  imports:[CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './mobility.html',
  styleUrl: './mobility.scss',
})
export class Mobility implements OnInit {
  bikeStations: any[] | null = null;
  carStations: any[] | null = null;

  constructor(private odService: OpenDataService) {}

  ngOnInit() {
    this.loadBike();
    this.loadCar();
  }

async loadBike() {
    try {
      const response = await this.odService.getBikestations();
      const data = (response && response.data) ? response.data : [];

      const stationsMap = new Map<string, any>();

      data.forEach((item: any) => {
        if (!item.pcode) return;

        if (!stationsMap.has(item.pcode)) {
          stationsMap.set(item.pcode, {
            code: item.pcode,
            name: item.pname || item.pcode || 'Unbekannte Station',
            municipality: item.pmetadata?.municipality || 'Unbekannt',
            lat: item.pcoordinate?.y,
            lng: item.pcoordinate?.x,
            active: item.pactive,
            bikes: []
          });
        }

        if (item.savailable) {
          const station = stationsMap.get(item.pcode);
          station.bikes.push(item.smetadata?.type || 'Fahrrad');
        }
      });

      this.bikeStations = Array.from(stationsMap.values()).sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

    } catch (error) {
      console.error("Fehler beim Laden der Fahrräder", error);
      this.bikeStations = [];
      this.odService.showErrorSnackBar('Fahrrad-Stationen konnten nicht geladen werden.');
    }
  }

  async loadCar() {
    try {
      const data = await this.odService.getCarStations();

      this.carStations = data.map((item: any) => ({
        name: item.sname,
        available: item.savailable,
        lat: item.scoordinate?.y,
        lng: item.scoordinate?.x,
        company: item.smetadata?.company?.name || item.smetadata?.company || 'Lokaler Anbieter',
        bookahead: item.smetadata?.bookahead ? 'Ja' : 'Nein'
      })).sort((a: any, b: any) => a.name.localeCompare(b.name));

    } catch (error) {
      console.error("Fehler beim Laden der Autos", error);
      this.carStations =[];
    }
  }

  getUniqueBikeTypes(bikes: string[]): string {
    if (!bikes || bikes.length === 0) return '-';
    const unique = [...new Set(bikes)];
    return unique.join(', ');
  }

  openMaps(lat: number, lng: number) {
    if (lat && lng) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  }
}
