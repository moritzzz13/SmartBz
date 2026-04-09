export class TrafficEvent {
    constructor(
        public type: string,            // RADAR, ROADWORKS, ...
        public title: string,          // Straße / Ort
        public description: string,     // placeDe / placeIt
        public start: Date,
        public end: Date,
        public lat: number,
        public lng: number,
        public publishedAt: Date
    ) {}
}
