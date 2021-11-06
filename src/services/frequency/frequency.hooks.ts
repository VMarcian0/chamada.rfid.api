import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import app from '../../app';
import { frequencyCreatePayloadNormalize } from '../../hooks/frequency';
import { UserType } from '../../types';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const pretifyResponse = async (context:HookContext) => {
  const userID = context.result?.user as string;
  const user = await app.services.users._get(userID as string) as UserType;
  context.result.name = user.name;
  context.result.ra = user.ra;
  return context;
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ frequencyCreatePayloadNormalize ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [pretifyResponse],
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
