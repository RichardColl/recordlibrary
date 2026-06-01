import { Routes } from '@angular/router';
import {Libraryintro } from './libraryintro/libraryintro';
import {Home } from './home/home'; 
import { Trackartist } from './trackartist/trackartist';

export const routes: Routes = [
	{ path: 'home', component: Home },  
    { path: 'track-artist', component: Trackartist }, 
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
