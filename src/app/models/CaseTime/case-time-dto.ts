import { Time } from '@angular/common'

export class CaseTimeDto {
  Id: number
  LawyerAssociationId: number
  Hours: number
  Minutes: number
  ModifiedDate: Date
  Description: string
  Task: string
  TotalTime: number
}
