export interface RequestDTO {
    Id: number;
    UserId: string;
    ParentId: number;
    ParentName: string;
    ChildId: number;
    ChildName: string;
    DateFrom: Date;
    DateTo: Date;
    FamilyId: number | null;
    FamilyName: string;
    Status: CustodyRequestStatusEnum;
    Notes: string;
    Children: Child[];
}

interface Child {
    Id: number;
    Name: string;
}

export enum CustodyRequestStatusEnum {
    Pending,
    Rejected,
    Approved
}