export interface CheckInOutDTO {
    Id: number;
    DateTime: string;
    IsCheckIn: boolean;
    Notes: string;
    Location: string;
    FamilyId: number | null;
    CreatedBy: string;
}