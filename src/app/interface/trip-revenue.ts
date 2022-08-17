export interface TripRevenue {
    id?: number;
    revenueNet: number;
    commissionNet: number;
    currency: string;
    exchangeRate?: number;
    exchangeRateDate?: Date;
    revenueNetLocal?: number;
    commissionNetLocal?: number;
}