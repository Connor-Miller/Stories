import { User } from "firebase/auth";

export const getToken = async (user: User) => {
    if (user) {
        try {
            const idToken = await user.getIdToken();
            console.log("JWT Token:", idToken);

            return idToken;
        } catch (error) {
            console.error("Error getting token", error);
        }
    }
};