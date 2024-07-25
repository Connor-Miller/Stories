import { makePostRequest } from "./apiRequestHandler";
import { AppUser } from "./types";

export const loginUser = async (token: string, appUser: AppUser) => {
    const url = 'api/user/login'
    
    return await makePostRequest<void, AppUser>(token, url, appUser, true);
};