import { ChildDTO } from "./UserDTO";

export class EventsDTO {
    EventId: number;
    EventNotes: string;
    EventSubject: string;
    EventStartDate: Date;
    EventEndDate: Date;
    EventBgColor: string;
    EventPlace: string;
    Children: ChildDTO[]
    IsPrivate: boolean
    EventStartTime: Date
    EventEndTime: Date
    IsAllDay: boolean
    type: string
    EventDateRange: Date[]
    CreatedBy: string
}