import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import fetchWithAuth from "../api/fetchWithAuth";

const AuthContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userPrefs, setUserPrefs] = useState(null);
    //const [token, setToken] = useState(null);

    const login = async (user, password) => {

        const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({user, password})
        });

        const data = await res.json();

        if (!res.ok) {
            localStorage.removeItem("token");
            //setToken(null);
            throw new Error("Erreur de login");
        }      

        // set the token in the local storage
        localStorage.setItem("token", data.token);
        //setToken(data.token);

        // decode the token
        const payload = jwtDecode(data.token);

        try {
            // get the user prefs
            const userPrefsData = await fetchWithAuth(`${apiUrl}/user/${payload.id}/prefs`);
            console.log("✅ Prefs loaded:", userPrefsData);

            //const userPrefsData = await resUserPrefs.json();

            setUser({userid: payload.id, username: payload.username, user: payload.user});
            setUserPrefs(userPrefsData);
        } catch (err) {
            console.error("❌ Error fetching prefs:", err);
        }
    };

    const logout = useCallback( () => {
        localStorage.removeItem("token");
        setUser(null);
    }, []);

    const checkToken = useCallback( () => {
        const token = localStorage.getItem("token");
        
        if (token) {
            const payload = jwtDecode(token);

            const validTo = payload.exp;

            if ( validTo > Date.now() / 1000 ) {
                    setUser({userid: payload.id, username: payload.username, user: payload.user});
                    return true;
                } else {
                    logout();
                    return false;
                }
        } else {
            return false;
        }

    }, [logout]);

    // when loading, check whether token is set
    useEffect( () => {
        checkToken();
        setLoading(false);
    }, [checkToken]);

    return (
        <AuthContext.Provider value = {{user, login, logout, loading, checkToken, userPrefs, setUserPrefs}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

