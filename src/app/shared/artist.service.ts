import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import {
  ArtistServiceData,
  ArtistCollection,
  ArtistComboCollection,
  ArtistMonoCollection
} from './artist.abstract.service';
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
export class ArtistService {

  public API = '//indiansummerrecordsserver.herokuapp.com';
  public ARTIST_API = this.API + '/artist';

  

  private _serviceData$ = new BehaviorSubject<ArtistServiceData>({
    artistServiceState: ServiceState.INITIAL,
    artistDetails: null,
    artistComboDetails: null,
    artistMonoDetails: null
  });

  serviceData$ = this._serviceData$.asObservable();

  private _artistserviceDataCombo$ = new BehaviorSubject<ArtistServiceData>({
    artistServiceState: ServiceState.INITIAL,
    artistDetails: null,
    artistComboDetails: null,
    artistMonoDetails: null
  });

  artistserviceDataCombo$ = this._artistserviceDataCombo$.asObservable();

  private _artistserviceDataMono$ = new BehaviorSubject<ArtistServiceData>({
    artistServiceState: ServiceState.INITIAL,
    artistDetails: null,
    artistComboDetails: null,
    artistMonoDetails: null
  });

  artistserviceDataMono$ = this._artistserviceDataMono$.asObservable();

  constructor(private http: HttpClient) {}
  
  
  // ---------------- CRUD ----------------

  save(artist: any): Observable<any> {
    return this.http.post(this.ARTIST_API, artist);
  }

  update(artist: any): Observable<any> {
    return this.http.put(artist.href, artist);
  }

  updateconnection(artist: any): Observable<any> {
    return this.http.post(
      `${this.API}/updateconnection/?artid=${artist.id}&conn=${artist.connection}`,
      {}
    );
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.ARTIST_API}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.ARTIST_API}/`);
  }

  getAllArtistsByDisplay(): Observable<any> {
    return this.http.get(`${this.ARTIST_API}/search/findAllByDisplayTrue`);
  }

  getassociatedartists(artistid: string, page: string, size: string): Observable<any> {
    return this.http.get(
      `${this.API}/getassociatedartistspaginated/?artid=${artistid}&page=${page}&size=${size}`
    );
  }

  // ---------------- STATE METHODS ----------------

  getArtistsByDisplay(): void {

    this._serviceData$.next({
      ...this._serviceData$.value,
      artistServiceState: ServiceState.IN_PROGRESS
    });

    this.http
      .get<ArtistCollection>(`${this.ARTIST_API}/search/findAllByDisplayTrue`)
      .pipe(
        tap(data => {
          this._serviceData$.next({
            ...this._serviceData$.value,
            artistServiceState: ServiceState.SUCCESS,
            artistDetails: data
          });
        }),
        catchError(() => {
          this._serviceData$.next({
            ...this._serviceData$.value,
            artistServiceState: ServiceState.ERROR
          });
          return of(null);
        })
      )
      .subscribe();
  }

  getMonoArtistByID(): void {

    

    this._artistserviceDataMono$.next({
      ...this._artistserviceDataMono$.value,
      artistServiceState: ServiceState.IN_PROGRESS
    });

    this.http
      .get<ArtistMonoCollection>(`${this.API}/monoFindByArtistId/?ID=610ad22b1d23272b4f8d38e0`)
      .pipe(
        tap(data => {
          this._artistserviceDataMono$.next({
            ...this._artistserviceDataMono$.value,
            artistServiceState: ServiceState.SUCCESS,
            artistMonoDetails: data
          });
        }),
        catchError(() => {
          this._artistserviceDataMono$.next({
            ...this._artistserviceDataMono$.value,
            artistServiceState: ServiceState.ERROR
          });
          return of(null);
        })
      )
      .subscribe();
  }

  getComboMonoArtistByID(): void {

    this._artistserviceDataCombo$.next({
      ...this._artistserviceDataCombo$.value,
      artistServiceState: ServiceState.IN_PROGRESS
    });

    this.http
      .get<ArtistComboCollection>(`${this.API}/monoComboFindByArtistId/?ID=629f37d5213d455896391720`)
      .pipe(
        tap(data => {
          this._artistserviceDataCombo$.next({
            ...this._artistserviceDataCombo$.value,
            artistServiceState: ServiceState.SUCCESS,
            artistComboDetails: data
          });
        }),
        catchError(() => {
          this._artistserviceDataCombo$.next({
            ...this._artistserviceDataCombo$.value,
            artistServiceState: ServiceState.ERROR
          });
          return of(null);
        })
      )
      .subscribe();
  }
}