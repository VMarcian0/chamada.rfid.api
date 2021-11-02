import { NotFound, Unprocessable } from "@feathersjs/errors";
import { Query } from "@feathersjs/feathers";
import app from "../../app";
import { UserType } from "../../types";

export const getUserFromRa = async (ra:string): Promise<UserType> =>{
    const query:Query = {
        ra
    }
    const users = await  app.services.users._find({query,paginate:false}) as UserType[];
    if (users.length == 0) throw new NotFound();
    /**
     * This error is not expected
     */
    if (users.length > 1)
        throw new Unprocessable("Users length is out of bounds",{length: users.length});
    
    return users[0];
}

export const getUserFromRFID = async (rfid:string): Promise<UserType> => {

    const query:Query = {
        rfid
    }
    const users = await  app.services.users._find({query,paginate:false}) as UserType[];
    if (users.length == 0) throw new NotFound();
    /**
     * ! This error is not expected
     */
    if (users.length > 1)
        throw new Unprocessable("Users length is out of bounds",{length: users.length});
    
    return users[0];
}