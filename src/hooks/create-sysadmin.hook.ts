import { Query } from "@feathersjs/feathers";
import app from "../app"
import logger from "../logger";
import { UserType } from "../types";

export const createSysadmin = async () => {
    console.log('Estou aqui?')
    const sysadmin = app.get("sysadmin") as {
        ra:string, 
        password:string, 
        name:string,
        role: string,
        major: string
    };
    const query :Query = {
        ra: sysadmin.ra
    }
    const users = await app.services.users._find({query,paginate:false}) as UserType[];
    if (users.length <= 0){
        logger.info("NO SYSADMIN FOUND")
        logger.info("Creating SYSADMIN")
        const res = await app.services.users.create(sysadmin) as UserType
        logger.info(`SYSADMIN ID ${res?._id}`);
        return res;
    }
    else {
        logger.info("SYSADMIN ALREADY EXISTS");
        return;
    }
    return;
}