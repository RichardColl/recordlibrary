import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceState } from './main-api.service';
import { ArtistMonoData, ArtistComboData } from './artist.abstract.service';

@Injectable({ providedIn: 'root' })
export class Artist {
	
	
	private API = '//indiansummerrecordsserver.herokuapp.com';

  // ===== STATE SIGNALS =====

  private monoState = signal<ServiceState>(ServiceState.INITIAL);
  private monoData = signal<ArtistMonoData | null>(null);

  private comboState = signal<ServiceState>(ServiceState.INITIAL);
  private comboData = signal<ArtistComboData | null>(null);

  // ===== PUBLIC READ-ONLY SIGNALS =====

  readonly monoStatus = computed(() => this.monoState());
  readonly monoArtist = computed(() => this.monoData());

  readonly comboStatus = computed(() => this.comboState());
  readonly comboArtist = computed(() => this.comboData());

  constructor(private http: HttpClient) {}


   // ===== ACTIONS =====

  loadMonoArtist(id: string): void {
    this.monoState.set(ServiceState.IN_PROGRESS);

    this.http
      .get<ArtistMonoData>(`${this.API}/monoFindByArtistId/?ID=${id}`)
      .subscribe({
        next: data => {
          this.monoData.set(data);
          this.monoState.set(ServiceState.SUCCESS);
        },
        error: () => {
          this.monoState.set(ServiceState.ERROR);
        }
      });
  }

  loadComboArtist(id: string): void {
    this.comboState.set(ServiceState.IN_PROGRESS);

    this.http
      .get<ArtistComboData>(`${this.API}/monoComboFindByArtistId/?ID=${id}`)
      .subscribe({
        next: data => {
          this.comboData.set(data);
          this.comboState.set(ServiceState.SUCCESS);
        },
        error: () => {
          this.comboState.set(ServiceState.ERROR);
        }
      });
  }



  
}



