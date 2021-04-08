export class FamilyDocumentsDto {
    DocumentId: number;
    FolderId: number;
    Name: string;
    Size: number;
    Type: string;
    FileUrl: string;
    BlobUrl: string;
    FamilyId: number;
    FamilyMemberId: number;
    DocumentFiles: File[] = [];
}

export class LawyerDocDTO {
    DocumentId: number;
    Name: string;
    Size: number;
    Type: string;
    FileUrl: string;
    BlobUrl: string;
    LawyerId: string;
    FamilyIds: number[];
    FamilyMembers: FamilyMember[];
    DocumentFiles: File[] = [];
}

class FamilyMember {
    Id: number;
    Name: string;
}

export class documentToShareDTO {
    DocumentId: number;
    LawyerId: string;
    FamilyMemberIds: number[];
}