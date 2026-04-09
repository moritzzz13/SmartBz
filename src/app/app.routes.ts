import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Weather } from './weather/weather';
import { Traffic } from './traffic/traffic';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'weather', component: Weather },
    { path: 'traffic', component: Traffic},
    { path: '**', redirectTo: 'home' }
];
