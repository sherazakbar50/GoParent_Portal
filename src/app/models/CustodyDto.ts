import { ChildDTO } from "./UserDTO";

export class CustodyDto{
    Id:number;
    Title:string;
    Notes:string;
    StartDate:Date;
    EndDate:string;
    FirstParentCustodyColor:string;
    SecondParentCustodyColor:string;
    ChildrenInfo:ChildDTO[]
    Children:number[]
    Color:string
    CustodySequences:CustodySequencesDto[]
}

export class CustodySequencesDto
{
    DateRange:Date[];
    CustodyBy:number;
    CustodyByName:number;
    StartDate:Date;
    EndDate:Date;
    Color:string
    Id:number;
    Title:string
    Statement:string;
    
}