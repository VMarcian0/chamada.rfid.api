import * as authentication from '@feathersjs/authentication';
import { Unprocessable } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import axios, { AxiosResponse } from "axios";
// Don't remove this comment. It's needed to format import lines nicely.

const url = 'chamadarfid.ddns.net:9090/'

const { authenticate } = authentication.hooks;
/**
 * 
 * @param context 
 */
const methodSwitch = async (context:HookContext) => {
  if (!context?.params?.headers?.authorization) { throw new Unprocessable(); }
  const token: string = context?.params?.headers?.authorization;
  if (!context?.data) throw new Unprocessable();
  /**
   * Starts the working of the module
   */
  if (context.data.method == "<INIT>"){
    
    const classroom = context.data.classroom as string;
    const payload = {
      token,
      classroom
    }
    let {data} = await axios.post(url+'init_attendance', JSON.stringify(payload))
    console.log(data);
    if (data == 'Chamada Iniciada'){
      context.result = "Success!";
      return context;
    }
    else {
      throw new Unprocessable();
    }
  }
  /**
   * Ends the working of the module
   */
  if (context.data.method == "<CLOSE>"){
    //if (data == 'Chamada finalizada')
  }
  /**
   * Get the module current status
   */
  if (context.data.method == "<GET>"){

  }
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
