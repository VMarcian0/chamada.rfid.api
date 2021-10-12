import { STATUS_KEYS } from ".."

export type ClassroomType = {
    _id?: string,
    name: string,
    professor: string,
    description?: string,
    courses?: CourseRefType[],
    createdAt?: string,
    updatedAt?: string
}

export type CourseRefType = {
    course: string,
    status: STATUS_KEYS,
    createdAt?: string,
    updatedAt?: string
}