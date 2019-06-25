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
    residualCalculation: ResidualCalculation;
    pmtCalc: PmtCalc;
    bookCalculation: BookCalc;
    annualMilesChargeCalc: AdditionalMilesChargeCalculation;
    taxesDue: TaxesDue;
    reserveToDealer: ReserveToDealer;
}
export interface ResidualCalculation {
    pct: number;
    pctDeduct: number;
    carRating: string;
    bookValue: number;
    residualDeduct: number;
    value: number;
}
export interface GrossCapCost {
    salePrice: number;
    dealerDocFee: number;
    tag: number;
    value: number;
}
export interface AdjCapCost {
    capCostReduction: number;
    value: number;
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
export interface AdditionalMilesChargeCalculation {
    value: number;
    annualIncrease: number;
}
export interface LeaseResidual {
    month: number;
    percent: number;
}
export interface CarRatingDeduct {
    rating: string;
    percent: number;
}
export interface TaxesDue {
    capCostReduction: number;
    stateTaxRate: number;
    stateTax: number;
    countyTaxRate: number;
    countyTax: number;
    value: number;
}
export interface ReserveToDealer {
    customerMonthlyRent: number;
    buyFeeDifference: number;
    totalReserveOverTerm: number;
    pctSplitPaid: number;
    value: number;
}
export interface DealerProfile
{
    yearModel: string;
    dlrBuyFactor: number;
    // maxSellFactor: number;
    // regularTerm: number;
}
