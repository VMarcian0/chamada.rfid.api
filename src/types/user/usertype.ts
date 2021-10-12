import { CourseRefType, MAJOR_KEYS, STATUS_KEYS } from ".."

export type UserType = {
    _id?: string,
    ra: string,
    cpf?: string
    courses?: CourseRefType[],
    classrooms?: ClassroomRefType[],
    createdAt?:string,
    updatedAt?:string,
    major: MAJOR_KEYS
}

export type ClassroomRefType = {
    _id?:string,
    room: string,
    status: STATUS_KEYS,
    createdAt?:string,
    updatedAt?:string
} 