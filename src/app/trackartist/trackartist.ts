import { Component, OnInit } from '@angular/core';
import { combineLatest, map, filter } from 'rxjs';
import { TrackService } from '../shared/track.service';
import { ArtistService } from '../shared/artist.service';
import { ServiceState } from '../shared/main-api.service';
import { TrackArtistViewModel } from '../shared/track.abstract.service';
import { inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule, AsyncPipe  } from '@angular/common';


@Component({
  selector: 'app-trackartist',
  imports: [NgIf, AsyncPipe ],
  templateUrl: './trackartist.html',
  styleUrl: './trackartist.css',
})

export class Trackartist implements OnInit {

private trackService = inject(TrackService);
private artistService = inject(ArtistService);

constructor(
    
  ) {}


 viewModel$ = combineLatest([
    this.trackService.trackserviceData$,
    this.artistService.artistserviceDataMono$
  ]).pipe(

    // only continue when both are SUCCESS
    filter(([trackState, artistState]) =>
      trackState.trackServiceState === ServiceState.SUCCESS &&
      artistState.artistServiceState === ServiceState.SUCCESS
    ),

    map(([trackState, artistState]) => {

      const track = trackState.trackDetails?.thetracks?.[0];
      const artist = artistState.artistMonoDetails?.theartistsmono?.[0];

      if (!track || !artist) return null;

      const vm: TrackArtistViewModel = {
        title: track.title,
        trackno: track.trackno,
        length: track.length,

        name: artist.name,
        menuimage: artist.menuimage,
        history: artist.history
      };

      return vm;
    })
  );

  
  ngOnInit(): void {
    this.trackService.getTrackByID('693d6f4f2aef37d30df1421a');
    this.artistService.getMonoArtistByID();
  }



}
