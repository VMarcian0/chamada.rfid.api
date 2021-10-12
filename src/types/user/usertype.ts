import { STATUS_KEYS } from ".."

export type UserType = {
    _id?: string,
    ra: string,
    cpf?: string
    course: string,
    classrooms?: ClassroomRefType[],
    createdAt?:string,
    updatedAt?:string
}

export type ClassroomRefType = {
    _id?:string,
    room: string,
    status: STATUS_KEYS,
    createdAt?:string,
    updatedAt?:string
} 