import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../interface/trip';
import { environment } from 'src/environments/environment';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private backendUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getTrips(page: number = 0, size: number = 10): Observable<Page<Trip[]>> {
    return this.http.get<Page<Trip[]>>(`${this.backendUrl}/trips/p?page=${page}&size=${size}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.backendUrl}/trips`, trip);
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.backendUrl}/trips`, trip);
  }

  deleteTrip(tripId: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/trips/${tripId}`)
  }
}