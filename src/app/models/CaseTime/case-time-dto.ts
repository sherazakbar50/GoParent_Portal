import { Time } from "@angular/common";

export class CaseTimeDto {
    Id:number;
    LawyerAssociationId: number;
    Hourse: number;
    Minutes: number;
    ModifiedDate: Date;
    Description: string;
    Task: string;
    TotalTime: number;
}
