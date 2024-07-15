export const getFollowedPersonsList = async (token: string) => {
    if (token) {
        try {
            const response = await fetch('/api/Family/test', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            console.log("API response:", data);

            return data;
        } catch (error) {
            console.error("Error making API call", error);

            return error;
        }
    } else {
        console.error("No token available");

        return Error("No token available");
    }
};