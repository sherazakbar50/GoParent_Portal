export class FamilyDocumentsDto {
    DocumentId: number;
    FolderId: number;
    Name: string;
    Size: number;
    Type: string;
    FileUrl: string;
    BlobUrl: string;
    FamilyId: number;
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
    Families: Family[];
    DocumentFiles: File[] = [];
}

class Family {
    FamilyId: number;
    FamilyName: string;
}

export class documentToShareDTO {
    DocumentId: number;
    LawyerId: string;
    FamilyIds: number[];
}