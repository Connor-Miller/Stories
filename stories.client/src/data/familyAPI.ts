import { makeGetRequest } from "./apiRequestHandler";

export const getFollowedPersonsList = async (token: string) => {
    const url = 'api/family/follows'
    console.log(token)
    return await makeGetRequest<any>(token, url, true);
};