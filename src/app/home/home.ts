import { Component } from '@angular/core';
import { Artist } from '../shared/artist';
import { ServiceState } from '../shared/main-api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
	
	ServiceStateEnum = ServiceState;

  constructor(public artist: Artist) {}

  ngOnInit(): void {
    this.artist.loadMonoArtist('610ad22b1d23272b4f8d38e0');
    this.artist.loadComboArtist('629f37d5213d455896391720');
  }

}
