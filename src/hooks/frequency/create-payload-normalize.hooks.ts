import { Forbidden, Unprocessable } from "@feathersjs/errors";
import { HookContext } from "@feathersjs/feathers";
import { FrequencyPayloadType, FrequencyType, ROLES_KEYS, STATUS_KEYS } from "../../types";
import { getUserFromRa, getUserFromRFID, getUserFromToken, verifyUserRole } from "../utills";

/**
 * 
 * @param context 
 * @returns context with the normalized payload
 */

export const frequencyCreatePayloadNormalize = async (context:HookContext)=>{
    const payload = context?.data as FrequencyPayloadType;
    
    if (!payload?.ra && !payload?.rfid)
        throw new Unprocessable("You must provide either a RFID Tag or an RA");
    
    const professor =  await getUserFromToken(context);
    
    if(!verifyUserRole(professor,ROLES_KEYS.PROFESSOR))
        throw new Forbidden("Authenticated user must be a professor", {id:professor?._id as string, role:professor.role})
    
    // If the frequency is been recorded through RFID tag
    if (payload?.rfid){
        const user = await getUserFromRFID(payload.rfid);
        const normalizedPayload : FrequencyType = {
            date: new Date().toISOString(),
            status: STATUS_KEYS.ACTIVE,
            user: user?._id as string
        }
        context.data = normalizedPayload;
    }
    else if (payload?.ra){
        const user = await getUserFromRa(payload.ra);
        const normalizedPayload : FrequencyType = {
            date: payload?.date || new Date().toISOString(),
            status: STATUS_KEYS.ACTIVE,
            user: user?._id as string
        }
        context.data = normalizedPayload;
    }
    else{
        throw new Unprocessable();
    }

    
    return context;
}