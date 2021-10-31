import { ROLES_KEYS, UserType } from "../../types";

export const verifyUserRole = async (user: UserType, role:ROLES_KEYS) =>{
    return user.role == role;
}