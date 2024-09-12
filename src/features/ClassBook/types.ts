export interface IClassBookState{
    students:IStudent[]
    subjects:ISubject[]
}
export interface IStudent{
    id?:string
    name:string
    surname:string
}
export interface ISubject{
    id?:string
    title:string
    marks:IMarks[]
}
export interface IMarks{
    id?:string
    student:string
    mark:number
}
export interface IAddMarkParam{
    id:string
    payload:ISubject
}

export interface IOpenModalParam{
    subjectId?:string
    studentId?:string
}