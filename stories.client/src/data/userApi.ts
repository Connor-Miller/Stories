import { makePostRequest } from "./apiRequestHandler";
import { AppUser } from "./types";

export const createUser = async (token: string, appUser: AppUser) => {
    const url = 'api/user/signup'
    
    return await makePostRequest<void, AppUser>(token, url, appUser, true);
};