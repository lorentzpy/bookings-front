import fetchWithAuth from "./fetchWithAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const createUser = async (login, username, password) => {

    const endPoint = `${apiUrl}/user/create`;
    const opts = {
        method: "POST",
        body: JSON.stringify({"user": login, "username": username, "password":password}),
    };

    try {
        const res = await fetchWithAuth(endPoint, opts);        

        return res;
    } catch (err) {
        console.error("fetch failed: ", err);
        throw err;
    }

    //
};

export default createUser;