export interface Lease {
    customerApp: CustomerApp;
    leaseResult: LeaseResult;
}
export interface CustomerApp {
    firstName: string;
    lastName: string;
    cashDown: number;
    currentAddress: CustomerAppAddress | null;
    vehicle: CustomerAppVehicle | null;
    term: number;
    tag: number;
    lenderAppId: number;
    dealerName: string | null;
    annualMiles: number;
}
export interface CustomerAppAddress {
    zip: string;
}
export interface CustomerAppVehicle {
    miles: number;
    year: number;
}
export interface LeaseResult {
    grossCapCost: GrossCapCost;
    adjCapCost: AdjCapCost;
    residualCalc: ResidualCalculation;
    pmtCalc: PmtCalc;
    bookCalculation: BookCalc;
    annualMilesChargeCalc: AdditionalMilesChargeCalculation;
}
export interface ResidualCalculation {
    value: number;
    pct: number;
    pctDeduct: number;
    calc: number;
    carRating: string;
}
export interface GrossCapCost {
    salePrice: number;
    value: number;
    dealerDocFee: number;
}
export interface AdjCapCost {
    value: number;
    capCostReduction: number;
}
export interface PmtCalc {
     adjustedCapitalizedCost: number;
     residual: number;
     depreciation: number;
     adjCapitalizedCostResidual: number;
     monthlyRentCharge: number;
     totalRentCharges: number;
     totalBaseMonthlyPmts: number;
     baseMonthlyPayment: number;
     monthlySalesUseTax: number;
     value: number;
}
export interface BookCalc {
    value: number;
    icoValue: number;
}
export interface AdditionalMilesChargeCalculation
{
    value: number;
    annualIncrease: number;
}
