import { Observable } from 'rxjs';
import { ServiceState } from './main-api.service';

export interface TrackData {
    id: any;
    title: string;
    trackno: string;
    length: string;
}

export interface TrackArtistViewModel {
  title: string;
  trackno: string;
  length: string;

  name: string;
  menuimage: string;
  history: string;
}


export interface TrackCollection {
   thetracks: Array<TrackData>;
}


export interface TrackServiceData {
  trackServiceState: ServiceState;
  trackDetails: TrackCollection | null;
}