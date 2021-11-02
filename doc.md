# CHAMADA RFID

## ENDPOINTS
* /users
* /frequency
* /courses
* /classrooms

### USERS
> Métodos
#### CREATE | POST
```
{
    cpf?: string
    major: MAJOR_KEYS,
    password: string,
    ra: string,
    role: ROLES_KEYS,
    rfid: string,
}
```
#### PATCH ou UPDATE
Pode ser um pouco complicado por causa do framework que eu estou usando mas você consegue pegar uma referência aqui : <https://docs.feathersjs.com/api/client/rest.html> 
Mas basicamente, se o atributo é um item único é só passar o campo que vai ser alterado e o valor dentro do body da requisição. Porém, no caso de adicionar um item a algum array, como no caso dos usuários, você vai precisar usar um operador especial do feathers que é igual a um do mongo o "$push".
```
// Exmeplo de uso do push
    <body da requisição>
    $push: { 
        classrooms: { 
            room: {id_de_uma_sala_aqui},
            status: APPROVED,
        }
    }
    </body da requisição>
```
#### GET e FIND
<https://docs.feathersjs.com/api/databases/querying.html>
> TYPES
```
export type UserType = {
    _id?: string,
    classrooms?: ClassroomRefType[],
    courses?: CourseRefType[],
    cpf?: string
    createdAt?:string,
    major: MAJOR_KEYS,
    password: string,
    ra: string,
    role: ROLES_KEYS,
    updatedAt?:string,
    rfid: string,
}
```
```
export type ClassroomRefType = {
    _id?:string,
    createdAt?:string,
    room: string,
    status: STATUS_KEYS,
    updatedAt?:string,
} 
```
```
export type CourseRefType = {
    _id?: string,
    course: string,
    status: STATUS_KEYS,
    createdAt?: string,
    updatedAt?: string
}
```
```
export enum MAJOR_KEYS{
    COMPUTACAO = "COMPUTAÇÃO",
    CIVIL= "CIVIL",
    QUIMICA = "QUÍMICA",
    SYSADMIN = "SYSADMIN",
}
```
```
export enum ROLES_KEYS{
    PROFESSOR = "PROFESSOR",
    EMBEDDED = "EMBEDDED",
    STUDENT = "STUDENT",
    SYSADMIN = "SYSADMIN"
}
```
```
export enum STATUS_KEYS{
    ACTIVE = 'active',
    PENDING = 'pending',
    REJECTED = 'rejected',
    FINISHED = 'finished'
}
```

### FREQUENCY
> Métodos
#### CREATE | POST
    se rfid existir -> chamda feita pelo embarcado,
    se ra existir -> chamda feita pelo front
```
export interface FrequencyPayloadType {
    rfid?:string,
    classroom: string,
    date?: string,
    ra?:string
}
```
#### PATCH ou UPDATE
Pode ser um pouco complicado por causa do framework que eu estou usando mas você consegue pegar uma referência aqui : <https://docs.feathersjs.com/api/client/rest.html> 
#### GET e FIND
<https://docs.feathersjs.com/api/databases/querying.html>
> TYPES
```
export interface FrequencyPayloadType {
    rfid?:string,
    classroom: string,
    date?: string,
    ra?:string
}
```
```
export type FrequencyType = {
    _id?: string,
    createdAt?:string,
    updatedAt?:string,
    user:string,
    status: STATUS_KEYS,
    date:string
}
```

### COURSES
> Métodos
#### CREATE | POST
```
{
    name:string,
    description?:string,
    addiontalInfo?:string,
    status: STATUS_KEYS
}
```
#### PATCH ou UPDATE
Pode ser um pouco complicado por causa do framework que eu estou usando mas você consegue pegar uma referência aqui : <https://docs.feathersjs.com/api/client/rest.html> 
#### GET e FIND
<https://docs.feathersjs.com/api/databases/querying.html>

> TYPES
```
export type CourseType = {
    _id?: string,
    createdAt?:string,
    updatedAt?:string,
    name:string,
    description?:string,
    addiontalInfo?:string,
    status: STATUS_KEYS
} 
```
### CLASSROOMS
> Métodos
#### CREATE | POST
```
{
    name: string,
    professor: {id_do_professor_aqui},
    description?: string,
}
```
#### PATCH ou UPDATE
Pode ser um pouco complicado por causa do framework que eu estou usando mas você consegue pegar uma referência aqui : <https://docs.feathersjs.com/api/client/rest.html> 

#### GET e FIND
<https://docs.feathersjs.com/api/databases/querying.html>
> TYPES
```
export type ClassroomType = {
    _id?: string,
    name: string,
    professor: string,
    description?: string,
    courses?: CourseRefType[],
    createdAt?: string,
    updatedAt?: string
}
```
```
export type CourseRefType = {
    _id?: string,
    course: string,
    status: STATUS_KEYS,
    createdAt?: string,
    updatedAt?: string
}
```