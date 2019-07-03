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
    collectFromLessee: CollectFromLessee;
    amountDueDealer: AmountDueDealer;
    discountPercent: DiscountPercent;
    minDiscount: MinDiscount;
    targetLeaseCap: TargetLeaseCap;
    overTargetFinDisc: OverTargetFinDisc;
    leaseDiscount: LeaseDiscount;
    dealerSaleNetProfit: DealerSaleNetProfit;
    minCashDown: MinCashDown;
}
export interface ResidualCalculation {
    pct: number;
    pctDeduct: number;
    carRating: string;
    bookValue: number;
    residualDeduct: number;
    retailValue: number;
    yearResidualImpactor: number;
    value: number;
}
export interface GrossCapCost {
    salePrice: number;
    dealerDocFee: number;
    tag: number;
    value: number;
}
export interface AdjCapCost {
    cash: number;
    capCostReduction: number;
    message: string;
    value: number;
}
export interface PmtCalc {
     adjCapCost: number;
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
    icoValue: number;
    nadaBookValue: number;
    retailValue: number;
    value: number;
}
export interface AdditionalMilesChargeCalculation {
    value: number;
    annualIncrease: number;
}
export interface LeaseResidual {
    month: number;
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
    adjCapitalizedCostResidual: number;
}
export interface DealerProfile {
    yearModel: string;
    dlrBuyFactor: number;
    maxSellFactor: number;
    regularTerm: number;
}
export interface CollectFromLessee {
    capCostReduction: number;
    securityDeposit: number;
    salesTax: number;
    stateFees: number;
    optionalProducts: number;
    value: number;
}
export interface AmountDueDealer {
    adjustedCapitalizedCost: number;
    firstSingleMonthlyPayment: number;
    leaseAcquisitionFee: number;
    dealerReserve: number;
    lessDiscount: number;
    value: number;
}
export interface DiscountPercent {
    adjustedCapitalizedCost: number;
    randomNumber: number;
    value: number;
}
export interface MinDiscount {
    adjCapCost: number;
    minDiscPercent: number;
    value: number;
}
export interface OverTargetFinDisc {
    discountAdvChange: number;
    targetLeaseCap: number;
    discountAdvanceOverPct: number;
    discountAdvanceUnderPct: number;
    value: number;

}
export interface TargetLeaseCap {
    bookValue: number;
    markupTarget: number;
    value: number;
}
export interface LeaseDiscount
{
    minDiscount: number;
    value: number;
}
export interface DealerSaleNetProfit
{
    leaseNetCheck: number;
    downPmt: number;
    tag: number;
    prepPac: number;
    dealerReserve: number;
    costAuction: number;
    shopFees: number;
    estDealerInventoryCost: number;
    value: number;
}
export interface AdjCapCostLimit {
    maxMarkup1: number;
    maxMarkup2: number;
    bookValue: number;
    adjCapCost: number;
    value: number;
}
export interface SalePrice
{
    shopFees: number;
    bookValue: number;
    dealerMarkup: number;
    value: number;
}
export interface MinCashDown
{
    cash: number;
    tradein: number;
    tradeinPayoff: number;
    message: string;
    value: number;
}
