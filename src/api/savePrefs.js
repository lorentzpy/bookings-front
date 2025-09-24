import fetchWithAuth from "./fetchWithAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const saveUserPrefs = async (user, prefs) => {
    const endPoint = `${apiUrl}/user/${user.userid}/prefs`;
    const opts = {
        method: "POST",
        body: JSON.stringify(prefs)
    };

    return await fetchWithAuth(endPoint, opts)
};

export default saveUserPrefs;