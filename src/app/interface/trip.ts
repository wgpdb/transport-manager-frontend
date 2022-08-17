import { Time } from "@angular/common";
import { TripRevenue } from "./trip-revenue";
import { WeatherData } from "./weather-data";

export interface Trip {
    id?: number;
    origin: string;
    stopover?: string;
    destination: string;
    tripDate: Date;
    departureTime: Time;
    tripStatus: string;
    tripRevenue: TripRevenue;
    created?: string;
    edited?: string;
    weatherData?: WeatherData[];
  }