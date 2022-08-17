import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trip } from 'src/app/interface/trip';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: Trip[] = [];
  tripToPreview?: Trip;
  tripToUpdate?: Trip;
  tripToDelete?: Trip;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.listTrips();
  }

  listTrips() {
    this.tripService.getTrips().subscribe(
      data => {
        this.trips = data;
      }
    );
  }

  addTrip(addForm: NgForm): void {
    document.getElementById('add-trip-form')?.click();
    this.tripService.addTrip(addForm.value).subscribe(
      (response: Trip) => {
        console.log(response);        
        this.listTrips();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  updateTrip(trip: Trip):void {
    document.getElementById('update-trip-form')?.click();
    this.tripService.updateTrip(trip).subscribe(
      (response: Trip) => {
        console.log(response);
        this.listTrips();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteTrip(tripId: number | undefined): void {
    this.tripService.deleteTrip(tripId!).subscribe(
      (response: void) => {
        console.log(response);
        this.listTrips();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOpenModal(mode: string, trip?: Trip): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTripModal');
    }
    if (mode === 'preview') {
      this.tripToPreview = trip;
    }
    if (mode === 'update') {
      this.tripToUpdate = trip;
      button.setAttribute('data-target', '#updateTripModal')
    }
    if (mode === 'delete') {
      this.tripToDelete = trip;
      button.setAttribute('data-target', '#deleteTripModal');
    }
    container?.appendChild(button);
    button.click();
  }
}