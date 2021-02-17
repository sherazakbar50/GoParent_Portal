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

