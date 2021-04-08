export class CaseDto {
    CaseId: number;
    FamilyId: number;
    LawyerAssociationId: number;
    FamilyName: string;
    LawyerId: number;
    LawyerName: string;
}


export interface CaseFamily {
    Id: number;
    Name: string;
    FamilyMembers: CaseFamilyMember[];
}

export interface CaseFamilyMember {
    Id: number;
    Name: string;
}