import fetchWithAuth from "./fetchWithAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const updatePassword = async (user, password, oldPassword) => {

    const endPoint = `${apiUrl}/user/${user.userid}/password`;
    const opts = {
        method: "PATCH",
        body: JSON.stringify({"password": password, "currentPassword": oldPassword}),
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

export default updatePassword;