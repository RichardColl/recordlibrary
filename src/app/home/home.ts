import { Component } from '@angular/core';
import { Artist } from '../shared/artist';
import { ServiceState } from '../shared/main-api.service';
import { TrackService } from '../shared/track.service';
import { TrackData } from '../shared/track.abstract.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
	
	ServiceStateEnum = ServiceState;

  constructor(public artist: Artist, private trackService: TrackService) {}

  ngOnInit(): void {
    this.artist.loadMonoArtist('610ad22b1d23272b4f8d38e0');
    this.artist.loadComboArtist('629f37d5213d455896391720');
    this.trackService.getTrackByID('693d6f4f2aef37d30df1421a');

  }

}
