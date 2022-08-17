export interface WeatherData {
    id?: number;
    city: string;
    country: string;
    dateTime: Date;
    averageTemp: number;
    feelsLikeTemp: number;
    description: string;
}