import { Routes } from '@angular/router';
import {Libraryintro } from './libraryintro/libraryintro';
import {Home } from './home/home'; 

export const routes: Routes = [
	{ path: 'home', component: Home },  
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
