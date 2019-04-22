import { AuthResponse } from "aws-lambda";

export const generatePolicy = (principalId: string, effect: string, resource: string, context?: any): any => {
    const authResponse: AuthResponse = {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };

    if (context) {
        authResponse.context = context; 
     }

     return authResponse;
}