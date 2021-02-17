export class UserSessionModel {
  UserId: string
  UserRole: string
  Username: string
  FamilyId: number
  FirstName: string
  LastName: string
  Email: string
  FamilyMemberId: number
  Relationship: string
  ProfilePicUrl: string
}

export enum ApplicationRolesEnum {
  Admin,
  Parent,
  Lawyer,
  Child,
}
