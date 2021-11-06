import * as authentication from '@feathersjs/authentication';
import { NotFound, Unprocessable } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import axios, { AxiosResponse } from "axios";
import app from '../../app';
import { ClassroomType } from '../../types';
// Don't remove this comment. It's needed to format import lines nicely.

const url = 'http://chamadarfid.ddns.net:9090/'

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
    if (!context.data?.classroom) throw new Unprocessable("Missing classroom id");
    const classroomId = context.data?.classroom as string;
    const classroom = await app.services.classrooms._get(classroomId as string) as ClassroomType;
    if (!classroom?._id) throw new NotFound("Classroom Not Found",{classroom:classroomId});
    const payload = {
      token,
      classroom
    }
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json"
    };
    let endpoint = url+'init_attendance' as string
    let {data} = await axios.post(endpoint , JSON.stringify(payload),{headers}) as AxiosResponse<String>
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
    const classroom = context.data.classroom as string;
    const payload = {
      token,
      classroom
    }
    let {data} = await axios.post(url+'close_attendance', JSON.stringify(payload))
    if (data == 'Chamada finalizada'){
      context.result = "Success!";
      return context;
    }
    else {
      throw new Unprocessable();
    }
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
    create: [methodSwitch],
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
