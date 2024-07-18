import { makeGetRequest } from "./apiRequestHandler";

export const getFollowedPersonsList = async (token: string) => {
    const url = 'api/family/follows'

    return await makeGetRequest<any>(token, url, true);
};