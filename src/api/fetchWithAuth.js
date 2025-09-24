// api/fetchWithAuth.js

const fetchWithAuth = async (url, options = {}) => {

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found, user not logged in");
  
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  
    // if (!res.ok) {
    //   throw new Error(res.error || "Erreur API");
    // }
  
    return res;
  }
  
  export default fetchWithAuth;