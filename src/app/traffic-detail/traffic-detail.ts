import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Wichtig für ngClass und die Pipes (Date, Number, etc.)
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrafficEvent } from '../traffic-event';

@Component({
  selector: 'sbz-traffic-detail',
  standalone: true,
  imports: [CommonModule], // Hier CommonModule einfügen, damit das HTML funktioniert!
  templateUrl: './traffic-detail.html',
  styleUrl: './traffic-detail.scss',
})
export class TrafficDetail {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TrafficEvent,
    private dialogRef: MatDialogRef<TrafficDetail> // Erlaubt es uns, den Dialog per Code zu schließen
  ) {}

  // Gibt eine dynamische Farbe/Klasse basierend auf dem Typ zurück
  getTypeClass(type: string): string {
    if (!type) return 'type-info';
    
    const t = type.toLowerCase();
    if (t.includes('unfall') || t.includes('accident')) return 'type-danger';
    if (t.includes('baustelle') || t.includes('construction') || t.includes('roadwork')) return 'type-warning';
    if (t.includes('stau') || t.includes('jam')) return 'type-alert';
    
    return 'type-info';
  }

  // Gibt ein passendes Icon (Emoji) zurück
  getTypeIcon(type: string): string {
    if (!type) return 'ℹ️';
    
    const t = type.toLowerCase();
    if (t.includes('unfall') || t.includes('accident')) return '💥';
    if (t.includes('baustelle') || t.includes('construction') || t.includes('roadwork')) return '🚧';
    if (t.includes('stau') || t.includes('jam')) return '🚗';
    
    return 'ℹ️';
  }

  // Wird aufgerufen, wenn auf das "X" geklickt wird
  onClose(): void {
    this.dialogRef.close();
  }
}