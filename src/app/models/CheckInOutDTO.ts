export interface CheckInOutDTO {
  Id: number
  IsCheckIn: boolean
  ChildId: number
  ChildName: string
  DateTime: string
  Notes: string
  Location: string
  FamilyId: number | null
  CreatedBy: string
  CreatedByName: string
}
