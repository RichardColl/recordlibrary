
import { ServiceState } from './main-api.service';

export interface ArtistData {
    id: any;
    name: string;
    menuimage: string;
    history: string;
}

export interface ArtistMonoData {
    id: any;
    name: string;
    menuimage: string;
    history: string;
}

export interface ArtistComboData {
    id: any;
    name: string;
    menuimage: string;
    history: string;
    relatedName: string;
    relatedHistory: string;
    relatedMenuimage: string;
}

export interface ArtistCollection {
   theartists: Array<ArtistData>;
}

export interface ArtistComboCollection {
   theartistscombo: Array<ArtistComboData>;
}

export interface ArtistMonoCollection {
   theartistsmono: Array<ArtistMonoData>;
}



export interface ArtistServiceData {

    artistServiceState: ServiceState;
    artistDetails: ArtistCollection;
    artistComboDetails:ArtistComboCollection;
    artistMonoDetails:ArtistMonoCollection;


}
