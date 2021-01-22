export class UserDTO{
    firstName:string
    lastName:String
    email:string
    password:string
    coParentEmail:string
    childs:Array<ChildDTO>
}

export class ChildDTO{
    childFirstName:string
    childLastName:string
}