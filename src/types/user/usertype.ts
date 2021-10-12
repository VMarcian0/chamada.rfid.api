import { STATUS_KEYS } from ".."

export type UserType = {
    _id?: string,
    ra: string,
    cpf?: string
    course: string,
    classrooms?: ClassroomType[],
    createdAt?:string,
    updatedAt?:string
}

export type ClassroomType = {
    _id?:string,
    room: string,
    status: STATUS_KEYS,
    createdAt?:string,
    updatedAt?:string
} 