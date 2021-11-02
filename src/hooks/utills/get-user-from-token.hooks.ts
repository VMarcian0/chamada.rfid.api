import { NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { UserType } from '../../types';

export const getUserIdFromTokenWhenPressent = async ( context: HookContext ): Promise<string> => {
  if (!context?.params?.headers?.authorization) { return "not an id"}
  const token: string = context?.params?.headers?.authorization;

  const decoded = jwt.decode( token );
  if ( !decoded ) { 
    return "not an id"
  }

  const userID: string = decoded?.sub as string;
  if ( !userID ) {
    return "not an id"
  }

  const user  = await app.services.users.get( userID ) as UserType;
  if (!user?._id){
    return "not an id"
  }

  return user._id as string;
}

export const getUserFromToken = async ( context: HookContext ): Promise<UserType> => {

  const token: string = context?.params?.headers?.authorization;
  if ( !token ) throw new NotAuthenticated('No authorization token has been found', { 
    sentHeaders: context?.params?.headers,
    missingHeader: { 'Authorization': '<token>'}
  });

  const decoded = jwt.decode( token );
  if ( !decoded ) throw new NotAuthenticated('Invalid JWT', { 
    token
  });

  const userID: string = decoded?.sub as string;
  if ( !userID ) throw new NotAuthenticated('Could not found property sub', {
    decodedToken: decoded
  });

  const user: UserType = await app.services.users.get( userID ) as UserType;

  return user;
};