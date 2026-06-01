import { TestBed } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import { HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { catchError, map, tap, take} from 'rxjs/operators';
import { ServiceState } from '../main-api.service';

fdescribe('ArtistService', () => {

   let artistservice = ArtistService;
   let debugElement: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [

              HttpClientModule
        ],
        providers: [

             ArtistService,
            HttpClient


         ]

      });

      artistservice = TestBed.get(ArtistService);

    }));

  it('should be created', () => {
    const service: ArtistService = TestBed.get(ArtistService);
    expect(service).toBeTruthy();
  });

  it('should return in initial state', () => {
      const service: ArtistService = TestBed.get(ArtistService);
      service.serviceData$.pipe(take(1)).subscribe(data => {
        expect(data.artistServiceState).toEqual(ServiceState.INITIAL);
        expect(data.artistDetails).toEqual(null);
      } )
    });




});
