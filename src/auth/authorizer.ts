import { Context, Handler } from 'aws-lambda';
import { verify } from 'jsonwebtoken';
import { generatePolicy } from './policy-generator';

export const handler : Handler = (event: any, context?: Context, callback?: Function) => {
    const token = event.authorizationToken;

    if (!token)
      return callback(null, 'Unauthorized');
  
    verify(token, process.env.JWT_SECRET, (err: any, decoded: { id: string; }) => {
      if (err)
        return callback(null, 'Unauthorized');
  
      return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
    });
}