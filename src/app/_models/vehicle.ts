export interface Vehicle {
    vin: string;
    bookValue: number;
    make: string;
    model: string;
    miles: number;
}

export interface VehicleMake {
    ID: number;
    make: string;
}
export interface VehicleModel {
    ID: number;
    model: string;
    rating: string;
    makeId: number;
    makeEntity: VehicleMake;
    year: number;
}
