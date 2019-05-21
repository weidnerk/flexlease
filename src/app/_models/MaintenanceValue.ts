export interface MaintenanceCategory {
    id: number;
    fileName: string;
    values: MaintenanceValue[];
}
export interface MaintenanceValue {
    id: number;
    ruleName: string;
    ruleFrom: string;
    ruleTo: string;
    value1: string;
    fileID: number;
}
