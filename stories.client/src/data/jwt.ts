import { User } from "firebase/auth";

export const getToken = async (user: User) => {
    if (user) {
        try {
            const idToken = await user.getIdToken();

            return idToken;
        } catch (error) {
            console.error("Error getting token", error);
        }
    }
};
export const fetchToken = async (user: User) => {
    if (user) {
        const newToken = await getToken(user);

        return newToken ?? "";
    }

    return "";
};