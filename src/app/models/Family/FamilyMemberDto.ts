export class FamilyMemberDto {
  Id: number
  Name: string
  ProfileImage: string
  PortalAccessCreated: boolean
  DisplayName:string
}

export class VaccineDto {
  Id: number
  Date: Date
  Name: string
  Notes: string
  FamilyMemberId: number
}
