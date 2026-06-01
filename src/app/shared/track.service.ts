import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { TrackServiceData, TrackCollection } from './track.abstract.service';
import { ServiceState } from './main-api.service';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  public API = '//indiansummerrecordsserver.herokuapp.com';
  public TRACK_API = this.API + '/track';

  private _trackserviceData$ = new BehaviorSubject<TrackServiceData>({
    trackServiceState: ServiceState.INITIAL,
    trackDetails: null
  });

  trackserviceData$ = this._trackserviceData$.asObservable();

  constructor(private http: HttpClient) {}

  getTrackByID(id: string): Observable<TrackCollection | null> {

    this._trackserviceData$.next({
      ...this._trackserviceData$.value,
      trackServiceState: ServiceState.IN_PROGRESS
    });

   return this.http
     .get<TrackCollection>(`${this.TRACK_API}/${id}`, httpOptions)
     .pipe(
       tap(data => {
         this._trackserviceData$.next({
           ...this._trackserviceData$.value,
           trackServiceState: ServiceState.SUCCESS,
           trackDetails: data
         });
       }),
       catchError(() => {
         this._trackserviceData$.next({
           ...this._trackserviceData$.value,
           trackServiceState: ServiceState.ERROR
         });
         return of(null);
       })
     );
    

  }
}